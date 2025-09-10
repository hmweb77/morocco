// src/lib/brevoService.js - Updated with free guide function
import * as brevo from '@getbrevo/brevo';

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Existing function for paid downloads
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

// NEW: Free guide email function
export async function sendFreeGuideEmail({ customerEmail, customerName, downloadLink }) {
  try {
    // Create email content for free guide
    const htmlContent = generateFreeGuideHTML({ customerName, downloadLink });
    const textContent = generateFreeGuideText({ customerName, downloadLink });

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email: customerEmail, name: customerName || 'Fellow Traveler' }];
    sendSmtpEmail.sender = { 
      email: 'contact@hmwebs.com', 
      name: 'Moroccan Advisor' 
    };
    sendSmtpEmail.subject = '🎁 Your FREE Morocco Travel Guide is Here!';
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.textContent = textContent;
    
    // Add template data for personalization
    sendSmtpEmail.params = {
      customerName: customerName || 'Traveler',
      downloadTitle: downloadLink.title
    };

    // Send email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('✅ Free guide email sent successfully:', response.body);
    return { success: true, messageId: response.body.messageId };
    
  } catch (error) {
    console.error('❌ Free guide email failed:', error);
    return { success: false, error: error.message };
  }
}

// FREE GUIDE EMAIL TEMPLATES

function generateFreeGuideHTML({ customerName, downloadLink }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Free Morocco Travel Guide</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F8F9FA;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F9FA;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #EF4444 0%, #F59E0B 100%); padding: 40px 32px; text-align: center;">
                  <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; margin-bottom: 8px;">
                    🎁 Your FREE Morocco Guide is Here!
                  </h1>
                  <p style="color: #FEF3C7; margin: 0; font-size: 16px;">
                    Hi ${customerName || 'Fellow Traveler'}! Get ready for an amazing Moroccan adventure.
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 32px;">
                  <h2 style="color: #1C3F60; margin: 0 0 24px 0; font-size: 24px; text-align: center;">
                    📚 Your Free Travel Guide
                  </h2>
                  
                  <p style="color: #2C2C2C; margin: 0 0 24px 0; line-height: 1.6; text-align: center;">
                    Thank you for your interest in traveling to Morocco! We've prepared this comprehensive guide to help you navigate Morocco like a local.
                  </p>

                  <!-- Download Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                    <tr>
                      <td align="center">
                        <div style="background: #F3E7D2; border: 2px solid #D38E63; border-radius: 16px; padding: 24px; text-align: center;">
                          <h3 style="color: #1C3F60; margin: 0 0 8px 0; font-size: 20px;">${downloadLink.title}</h3>
                          <p style="color: #70977B; margin: 0 0 20px 0; font-size: 14px;">
                            📄 ${downloadLink.filename} • ${downloadLink.description}
                          </p>
                          <a href="${downloadLink.url}" 
                             style="display: inline-block; background: #A34128; color: white; padding: 16px 32px; 
                                    text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 18px;">
                            📥 Download Your Free Guide
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- What's Inside -->
                  <div style="background: #F0F9FF; border: 2px solid #3B82F6; border-radius: 12px; padding: 24px; margin: 24px 0;">
                    <h3 style="color: #1E40AF; margin: 0 0 16px 0; font-size: 18px;">
                      🎯 What's Inside Your Free Guide:
                    </h3>
                    <ul style="color: #1E40AF; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
                      <li>Essential safety tips for Morocco</li>
                      <li>How to avoid common tourist traps</li>
                      <li>Cultural etiquette and respectful travel</li>
                      <li>Budget-friendly travel recommendations</li>
                      <li>Useful Arabic/French phrases</li>
                      <li>Local customs and traditions to know</li>
                    </ul>
                  </div>

                  <!-- Important Note -->
                  <div style="background: #FEF3C7; border: 2px solid #F59E0B; border-radius: 12px; padding: 20px; margin: 24px 0;">
                    <h3 style="color: #92400E; margin: 0 0 12px 0; font-size: 16px;">
                      ⏰ Important: Download Within 24 Hours
                    </h3>
                    <p style="color: #92400E; margin: 0; font-size: 14px;">
                      Your download link expires in 24 hours for security. Make sure to save the PDF to your device for offline access during your trip!
                    </p>
                  </div>

                  <!-- Next Steps -->
                  <h3 style="color: #1C3F60; margin: 32px 0 16px 0;">Ready for More?</h3>
                  <p style="color: #2C2C2C; margin: 0 0 20px 0; line-height: 1.6;">
                    If you love this free guide, check out our premium travel guides for even more detailed insights, itineraries, and local secrets.
                  </p>
                  
                  <div style="text-align: center; margin: 20px 0;">
                    <a href="https://moroccanadvisor.com/guide" 
                       style="display: inline-block; background: #3E8DC1; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 8px; font-weight: bold; margin-right: 12px;">
                      🗺️ Browse Premium Guides
                    </a>
                    <a href="https://moroccanadvisor.com/experiences" 
                       style="display: inline-block; background: #70977B; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 8px; font-weight: bold;">
                      ✨ Explore Experiences
                    </a>
                  </div>
                </td>
              </tr>

              <!-- Support -->
              <tr>
                <td style="background: #F8F9FA; padding: 24px; text-align: center; border-top: 1px solid #E8DCC6;">
                  <h3 style="color: #1C3F60; margin: 0 0 12px 0;">Questions About Your Trip?</h3>
                  <p style="color: #70977B; margin: 0 0 16px 0; font-size: 14px;">
                    We're here to help you plan the perfect Morocco adventure!
                  </p>
                  <a href="mailto:contact@hmwebs.com" 
                     style="background: #3E8DC1; color: white; padding: 12px 24px; 
                            text-decoration: none; border-radius: 8px; font-weight: bold;">
                    Contact Our Travel Experts
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: #1C3F60; padding: 24px; text-align: center;">
                  <p style="color: #F3E7D2; margin: 0; font-size: 14px;">
                    Thank you for choosing Moroccan Advisor<br>
                    Your authentic Morocco adventure starts here! 🇲🇦✨
                  </p>
                  <p style="color: #70977B; margin: 16px 0 0 0; font-size: 12px;">
                    You received this email because you requested our free Morocco travel guide.
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

function generateFreeGuideText({ customerName, downloadLink }) {
  return `
🎁 Your FREE Morocco Travel Guide is Here!

Hi ${customerName || 'Fellow Traveler'}! Get ready for an amazing Moroccan adventure.

📚 YOUR FREE DOWNLOAD:
${downloadLink.title}
${downloadLink.description}

Download: ${downloadLink.url}
File: ${downloadLink.filename}
Expires: ${downloadLink.expiresIn}

🎯 WHAT'S INSIDE YOUR FREE GUIDE:
• Essential safety tips for Morocco
• How to avoid common tourist traps  
• Cultural etiquette and respectful travel
• Budget-friendly travel recommendations
• Useful Arabic/French phrases
• Local customs and traditions to know

⏰ IMPORTANT: Download within 24 hours
Your download link expires in 24 hours for security. Save the PDF to your device for offline
  `;
}

