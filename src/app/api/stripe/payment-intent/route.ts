import StripePayment from "@/src/utils/stripe/stripeServer";
import { NextRequest, NextResponse } from "next/server";

const stripe = StripePayment.getInstance();

export const POST = async (req: NextRequest) => {
  try {
    const body: any = await req.json();
    const paymentIntent = await stripe.createPaymentIntentByPaymentMethod(body.paymentMethod, body.amount, body.currency);

    // return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    return NextResponse.json({ paymentIntent }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create Payment Intent" }, { status: 500 });
  }
};
