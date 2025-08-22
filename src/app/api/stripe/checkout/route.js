// src/app/api/stripe/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

export async function POST(request) {
  try {
    const { priceId, quantity = 1 } = await request.json();

    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Price ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get the current domain for redirect URLs
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'payment',
      
      // ✅ Key: Set up redirect URLs
      success_url: `${origin}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/guide?canceled=true`,
      
      // Optional: Collect customer details
      billing_address_collection: 'auto',
      customer_creation: 'always',
      
      // Optional: Add metadata
      metadata: {
        priceId: priceId,
        timestamp: new Date().toISOString(),
      },
      
      // Optional: Automatic tax calculation
      automatic_tax: { enabled: false },
      
      // Optional: Allow promotion codes
      allow_promotion_codes: true,
    });

    return new Response(JSON.stringify({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to create checkout session',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}