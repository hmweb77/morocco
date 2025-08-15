// src/app/api/stripe/claim/route.js
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PRICE_TO_FILE } from "@/lib/ebooks";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { 
  apiVersion: "2024-06-20" 
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  
  if (!session_id) {
    return new Response(JSON.stringify({ error: "Missing session_id" }), { 
      status: 400 
    });
  }

  try {
    console.log("Processing download for session:", session_id);

    // 1) Verify payment
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("Session status:", session.payment_status);
    
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ error: "Payment not verified" }), { 
        status: 403 
      });
    }

    // 2) Get purchased items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { 
      limit: 10 
    });

    console.log("Line items:", lineItems.data.map(item => ({
      priceId: item.price?.id,
      description: item.description
    })));

    const links = [];

    // 3) Process each purchased item
    for (const item of lineItems.data) {
      const priceId = item?.price?.id;
      if (!priceId) {
        console.log("No price ID found for item");
        continue;
      }

      const fileConfig = PRICE_TO_FILE[priceId];
      if (!fileConfig) {
        console.log("No file config found for price:", priceId);
        continue;
      }

      console.log("Processing file config:", fileConfig.title);

      // Handle bundle vs single file
      if (fileConfig.isBundle && fileConfig.additionalFiles) {
        console.log("Processing bundle with additional files");
        
        // Main file
        const mainLink = await createSignedUrl(fileConfig);
        if (mainLink) {
          links.push(mainLink);
          console.log("Added main file:", mainLink.title);
        }

        // Additional files in bundle
        for (const additionalFile of fileConfig.additionalFiles) {
          const additionalLink = await createSignedUrl(additionalFile);
          if (additionalLink) {
            links.push(additionalLink);
            console.log("Added additional file:", additionalLink.title);
          }
        }
      } else {
        // Single file
        const link = await createSignedUrl(fileConfig);
        if (link) {
          links.push(link);
          console.log("Added single file:", link.title);
        }
      }
    }

    if (!links.length) {
      console.log("No download links generated");
      return new Response(JSON.stringify({ error: "No downloadable items found" }), { 
        status: 404 
      });
    }

    console.log("Successfully generated", links.length, "download links");

    // 4) Return download links with customer info
    const response = {
      links,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      sessionId: session_id,
      message: "Download links generated successfully"
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing download:", error);
    
    // Return more specific error messages
    let errorMessage = "Internal server error";
    if (error.type === 'StripeInvalidRequestError') {
      errorMessage = "Invalid payment session";
    } else if (error.message?.includes('Supabase')) {
      errorMessage = "File access error";
    }

    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }), { 
      status: 500 
    });
  }
}

async function createSignedUrl(fileConfig) {
  try {
    console.log(`Creating signed URL for: ${fileConfig.bucket}/${fileConfig.path}`);

    // First check if file exists
    const { data: fileData, error: fileError } = await supabaseAdmin.storage
      .from(fileConfig.bucket)
      .list('', {
        search: fileConfig.path.split('/').pop()
      });

    if (fileError || !fileData?.length) {
      console.error(`File not found: ${fileConfig.bucket}/${fileConfig.path}`, fileError);
      return null;
    }

    // Create signed URL with 24 hour expiry
    const { data, error } = await supabaseAdmin.storage
      .from(fileConfig.bucket)
      .createSignedUrl(fileConfig.path, 60 * 60 * 24, { // 24 hours
        download: true,
        downloadName: fileConfig.path.split("/").pop(),
      });

    if (error) {
      console.error("Supabase signed URL error:", error);
      return null;
    }

    if (!data?.signedUrl) {
      console.error("No signed URL returned from Supabase");
      return null;
    }

    console.log("Successfully created signed URL for:", fileConfig.title);

    return { 
      title: fileConfig.title, 
      url: data.signedUrl,
      filename: fileConfig.path.split("/").pop(),
      expiresIn: "24 hours"
    };

  } catch (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }
}

// Optional: Add POST method for webhook handling
export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle successful payment events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Payment completed for session:', session.id);
      
      // Here you could:
      // - Send email notifications
      // - Log the purchase
      // - Update analytics
      // - Add to customer database
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error', { status: 400 });
  }
}