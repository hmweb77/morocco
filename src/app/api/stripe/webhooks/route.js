// Step 4: Update webhook to send email - src/app/api/stripe/webhooks/route.js
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { PRICE_TO_FILE } from '@/lib/ebooks';
import { sendDownloadEmail } from '@/lib/brevoService';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('❌ No Stripe signature found');
    return new Response('Webhook signature missing', { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    console.log('✅ Payment completed for session:', session.id);
    console.log('📧 Customer email:', session.customer_details?.email);

    try {
      // Get purchased items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        limit: 10,
      });

      console.log('🛒 Line items:', lineItems.data.length);

      // Generate download links
      const downloadLinks = [];
      for (const item of lineItems.data) {
        const priceId = item?.price?.id;
        if (!priceId) continue;

        const fileConfig = PRICE_TO_FILE[priceId];
        if (!fileConfig) {
          console.log(`⚠️ No file config found for price: ${priceId}`);
          continue;
        }

        console.log(`📁 Processing: ${fileConfig.title}`);

        // Handle bundle vs single file
        if (fileConfig.isBundle && fileConfig.additionalFiles) {
          // Main file
          const mainLink = await createSignedUrl(fileConfig);
          if (mainLink) downloadLinks.push(mainLink);

          // Additional files
          for (const additionalFile of fileConfig.additionalFiles) {
            const additionalLink = await createSignedUrl(additionalFile);
            if (additionalLink) downloadLinks.push(additionalLink);
          }
        } else {
          // Single file
          const link = await createSignedUrl(fileConfig);
          if (link) downloadLinks.push(link);
        }
      }

      if (downloadLinks.length === 0) {
        console.error('❌ No download links generated');
        return new Response('No download links generated', { status: 500 });
      }

      console.log(`✅ Generated ${downloadLinks.length} download links`);

      // Send email with download links
      if (session.customer_details?.email) {
        await sendDownloadEmail({
          customerEmail: session.customer_details.email,
          customerName: session.customer_details.name,
          downloadLinks: downloadLinks,
          sessionId: session.id
        });

        console.log('✅ Download email sent successfully');
      } else {
        console.error('❌ No customer email found');
      }

      // Optional: Store purchase record
      // await storePurchaseRecord(session, downloadLinks);

    } catch (error) {
      console.error('❌ Error processing webhook:', error);
      return new Response(`Webhook processing error: ${error.message}`, { 
        status: 500 
      });
    }
  }

  return new Response('Webhook processed successfully', { status: 200 });
}

async function createSignedUrl(fileConfig) {
  try {
    console.log(`🔗 Creating signed URL for: ${fileConfig.bucket}/${fileConfig.path}`);

    // Check if file exists
    const { data: fileData, error: fileError } = await supabaseAdmin.storage
      .from(fileConfig.bucket)
      .list('', {
        search: fileConfig.path.split('/').pop()
      });

    if (fileError || !fileData?.length) {
      console.error(`❌ File not found: ${fileConfig.bucket}/${fileConfig.path}`);
      return null;
    }

    // Create signed URL with 24 hour expiry
    const { data, error } = await supabaseAdmin.storage
      .from(fileConfig.bucket)
      .createSignedUrl(fileConfig.path, 60 * 60 * 24, {
        download: true,
        downloadName: fileConfig.path.split('/').pop(),
      });

    if (error) {
      console.error('❌ Supabase signed URL error:', error);
      return null;
    }

    if (!data?.signedUrl) {
      console.error('❌ No signed URL returned');
      return null;
    }

    console.log(`✅ Signed URL created for: ${fileConfig.title}`);

    return {
      title: fileConfig.title,
      url: data.signedUrl,
      filename: fileConfig.path.split('/').pop(),
      expiresIn: '24 hours'
    };

  } catch (error) {
    console.error('❌ Error creating signed URL:', error);
    return null;
  }
}

// Step 5: Test webhook endpoint - src/scripts/test-webhook.js
const testWebhook = async () => {
  const testEvent = {
    id: 'evt_test_webhook',
    object: 'event',
    api_version: '2024-06-20',
    created: Math.floor(Date.now() / 1000),
    data: {
      object: {
        id: 'cs_test_session',
        object: 'checkout.session',
        customer_details: {
          email: 'test@example.com',
          name: 'Test User'
        },
        payment_status: 'paid'
      }
    },
    type: 'checkout.session.completed'
  };

  try {
    const response = await fetch('http://localhost:3000/api/stripe/webhooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test_signature'
      },
      body: JSON.stringify(testEvent)
    });

    console.log('Webhook test response:', await response.text());
  } catch (error) {
    console.error('Webhook test failed:', error);
  }
};

// Uncomment to test:
// testWebhook();