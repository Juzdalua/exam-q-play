import StripePayment from "@/src/utils/stripe/stripeServer";
import { NextRequest, NextResponse } from "next/server";

const stripe = StripePayment.getInstance();

export const POST = async (req: NextRequest) => {
  const body: any = await req.json();
  const customer = await stripe.createCustomer(body.email);

  return NextResponse.json({ result: customer }, { status: 200 });
};
