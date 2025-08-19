// Step 1: Install Brevo SDK
// npm install @getbrevo/brevo

// Step 2: Add environment variables to .env.local
/*
BREVO_API_KEY=your_brevo_api_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
*/

// Step 3: Create Brevo email service - src/lib/brevoService.js
import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export async function sendDownloadEmail({ customerEmail, customerName, downloadLinks, sessionId }) {
  try {
    // Create email content
    const htmlContent = generateEmailHTML({ customerName, downloadLinks, sessionId });
    const textContent = generateEmailText({ customerName, downloadLinks });

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: customerEmail, name: customerName || 'Valued Customer' }];
    sendSmtpEmail.sender = { 
      email: 'contact@hmwebs.com', 
      name: 'Moroccan Advisor' 
    };
    sendSmtpEmail.subject = '🎉 Your Morocco Travel Guides Are Ready!';
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent;
    
    // Add template data for personalization
    sendSmtpEmail.params = {
      customerName: customerName || 'Traveler',
      downloadCount: downloadLinks.length,
      sessionId: sessionId
    };

    // Send email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Email sent successfully:', response.body);
    return { success: true, messageId: response.body.messageId };
    
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
}

function generateEmailHTML({ customerName, downloadLinks, sessionId }) {
  const downloadLinksHTML = downloadLinks.map(link => `
    <tr>
      <td style="padding: 20px; border: 2px solid #E8DCC6; border-radius: 12px; margin-bottom: 16px; background: #FDFDFD;">
        <h3 style="color: #1C3F60; margin: 0 0 8px 0; font-size: 18px;">${link.title}</h3>
        <p style="color: #70977B; margin: 0 0 16px 0; font-size: 14px;">
          📄 ${link.filename} • Expires in ${link.expiresIn || '24 hours'}
        </p>
        <a href="${link.url}" 
           style="display: inline-block; background: #A34128; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 8px; font-weight: bold;">
          📥 Download Now
        </a>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Morocco Travel Guides</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F8F9FA;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F9FA;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #1C3F60 0%, #3E8DC1 100%); padding: 40px 32px; text-align: center;">
                  <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; margin-bottom: 8px;">
                    🎉 Thank You for Your Purchase!
                  </h1>
                  <p style="color: #F3E7D2; margin: 0; font-size: 16px;">
                    Hi ${customerName || 'Traveler'}! Your Morocco travel guides are ready to download.
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <h2 style="color: #1C3F60; margin: 0 0 24px 0; font-size: 24px;">
                    📚 Your Download Links
                  </h2>
                  
                  <p style="color: #2C2C2C; margin: 0 0 24px 0; line-height: 1.6;">
                    Your purchase has been processed successfully! Click the download buttons below to get your travel guides:
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${downloadLinksHTML}
                  </table>

                  <div style="background: #FEF3C7; border: 2px solid #F59E0B; border-radius: 12px; padding: 20px; margin: 24px 0;">
                    <h3 style="color: #92400E; margin: 0 0 12px 0; font-size: 16px;">
                      ⏰ Important: Download Within 24 Hours
                    </h3>
                    <ul style="color: #92400E; margin: 0; padding-left: 20px; font-size: 14px;">
                      <li>Download links expire in 24 hours for security</li>
                      <li>Save the PDF files to your device for offline access</li>
                      <li>No internet required once downloaded</li>
                    </ul>
                  </div>

                  <h3 style="color: #1C3F60; margin: 32px 0 16px 0;">What's Next?</h3>
                  <div style="display: flex; gap: 16px; margin-bottom: 24px;">
                    <div style="flex: 1; background: #F3E7D2; padding: 16px; border-radius: 8px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">📱</div>
                      <div style="color: #1C3F60; font-weight: bold; margin-bottom: 4px;">Save for Offline</div>
                      <div style="color: #70977B; font-size: 12px;">Download to your phone for easy access</div>
                    </div>
                    <div style="flex: 1; background: #F3E7D2; padding: 16px; border-radius: 8px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">🗺️</div>
                      <div style="color: #1C3F60; font-weight: bold; margin-bottom: 4px;">Start Planning</div>
                      <div style="color: #70977B; font-size: 12px;">Use guides to plan your itinerary</div>
                    </div>
                    <div style="flex: 1; background: #F3E7D2; padding: 16px; border-radius: 8px; text-align: center;">
                      <div style="font-size: 24px; margin-bottom: 8px;">🛡️</div>
                      <div style="color: #1C3F60; font-weight: bold; margin-bottom: 4px;">Travel Safely</div>
                      <div style="color: #70977B; font-size: 12px;">Follow our safety tips</div>
                    </div>
                  </div>
                </td>
              </tr>

              <!-- Support -->
              <tr>
                <td style="background: #F8F9FA; padding: 24px; text-align: center; border-top: 1px solid #E8DCC6;">
                  <h3 style="color: #1C3F60; margin: 0 0 12px 0;">Need Help?</h3>
                  <p style="color: #70977B; margin: 0 0 16px 0; font-size: 14px;">
                    Having trouble downloading or questions about your trip?
                  </p>
                  <a href="mailto:contact@hmwebs.com" 
                     style="background: #3E8DC1; color: white; padding: 12px 24px; 
                            text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Contact Support
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #1C3F60; padding: 24px; text-align: center;">
                  <p style="color: #F3E7D2; margin: 0; font-size: 14px;">
                    Thank you for choosing Moroccan Advisor<br>
                    Have an amazing trip! 🇲🇦✨
                  </p>
                  <p style="color: #70977B; margin: 16px 0 0 0; font-size: 12px;">
                    Order ID: ${sessionId}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function generateEmailText({ customerName, downloadLinks }) {
  const downloadLinksText = downloadLinks.map(link => 
    `• ${link.title}\n  Download: ${link.url}\n  Expires: ${link.expiresIn || '24 hours'}\n`
  ).join('\n');

  return `
🎉 Thank You for Your Purchase!

Hi ${customerName || 'Traveler'}! Your Morocco travel guides are ready to download.

📚 YOUR DOWNLOAD LINKS:
${downloadLinksText}

⏰ IMPORTANT: Download within 24 hours
• Links expire in 24 hours for security
• Save PDF files to your device for offline access
• No internet required once downloaded

🗺️ WHAT'S NEXT?
1. Download the PDFs to your phone for easy access
2. Use the guides to plan your itinerary  
3. Follow our safety tips for an authentic experience

❓ NEED HELP?
Email us at contact@hmwebs.com

Thank you for choosing Moroccan Advisor!
Have an amazing trip! 🇲🇦✨
  `;
}

