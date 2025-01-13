import stripe from "@/src/utils/stripe/stripeServer";
import { NextRequest, NextResponse } from "next/server";

const GetSrtipeCustomer = async() => {
  const customers = await stripe.customers.list();
  return customers;
}

export const GET = async (req: NextRequest) => {
  const customers = await GetSrtipeCustomer();

  return NextResponse.json({result: customers}, {status: 200});
}