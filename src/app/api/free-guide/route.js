// src/app/api/free-guide/route.js
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { sendFreeGuideEmail } from '@/lib/brevoService';

export async function POST(request) {
  try {
    const { name, email } = await request.json();

    // Validation
    if (!name || !email) {
      return new Response(JSON.stringify({ 
        error: 'Name and email are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Please enter a valid email address' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Processing free guide request for:', email);

    // Free guide configuration
    const freeGuideConfig = {
      bucket: "freeebook",
      path: "free-morocco-guide.pdf", // Update with your actual file name
      title: "Free Morocco Travel Safety Guide",
      description: "Essential tips for safe and authentic travel in Morocco"
    };

    // Create signed URL for the free guide
    const signedUrl = await createSignedUrl(freeGuideConfig);
    
    if (!signedUrl) {
      throw new Error('Unable to generate download link');
    }

    // Send email with download link
    try {
      const emailResult = await sendFreeGuideEmail({
        customerEmail: email,
        customerName: name,
        downloadLink: signedUrl
      });
      
      if (!emailResult.success) {
        console.error('Email sending failed:', emailResult.error);
        // Don't fail the entire request if email fails
      } else {
        console.log('Free guide email sent successfully:', emailResult.messageId);
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue with the response even if email fails
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Free guide sent successfully',
      email: email
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Free guide error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to send free guide. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
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
      description: fileConfig.description,
      url: data.signedUrl,
      filename: fileConfig.path.split("/").pop(),
      expiresIn: "24 hours"
    };

  } catch (error) {
    console.error("Error creating signed URL:", error);
    return null;
  }
}