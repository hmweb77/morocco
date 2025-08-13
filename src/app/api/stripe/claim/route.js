// /app/api/stripe/claim/route.js
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { PRICE_TO_FILE } from "@/lib/ebooks";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  if (!session_id) {
    return new Response(JSON.stringify({ error: "Missing session_id" }), { status: 400 });
  }

  // 1) Verify payment
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session.payment_status !== "paid") {
    return new Response(JSON.stringify({ error: "Payment not verified" }), { status: 403 });
  }

  // 2) Get purchased items
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });

  const links = [];

  for (const item of lineItems.data) {
    const priceId = item?.price?.id;
    if (!priceId) continue;

    const file = PRICE_TO_FILE[priceId];
    if (!file) continue;

    // 3) Create a signed URL (1 hour)
    const { data, error } = await supabaseAdmin
      .storage
      .from(file.bucket)
      .createSignedUrl(file.path, 60 * 60, {
        download: true,
        downloadName: file.path.split("/").pop(),
      });

    if (!error && data?.signedUrl) {
      links.push({ title: file.title, url: data.signedUrl });
    }
  }

  if (!links.length) {
    return new Response(JSON.stringify({ error: "No downloadable items" }), { status: 404 });
  }

  return new Response(JSON.stringify({ links }), {
    headers: { "Content-Type": "application/json" },
  });
}
