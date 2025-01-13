import StripePayment from "@/src/utils/stripe/stripeServer";
import { NextRequest, NextResponse } from "next/server";

const stripe = StripePayment.getInstance();

export const POST = async (req: NextRequest) => {
  try {
    const body: any = await req.json();
    const paymentIntent = await stripe.createPaymentIntentByPaymentId(body.paymentMethod, body.amount, body.currency);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create Payment Intent" }, { status: 500 });
  }
};
