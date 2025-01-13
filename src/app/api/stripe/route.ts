import StripePayment from "@/src/utils/stripe/stripeServer";
import { NextRequest, NextResponse } from "next/server";

const stripe = StripePayment.getInstance();

export const GET = async (req: NextRequest) => {
  const customers = await stripe.getAllCustomer();

  return NextResponse.json({ result: customers }, { status: 200 });
};
