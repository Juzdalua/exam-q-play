import stripe from "@/src/utils/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

const CreateStripeCustomer = async (email: string) => {
  const customer = await stripe.customers.create({
    email,
  });

  return customer;
};

export const POST = async (req: NextRequest) => {
  const body: any = await req.body;
  const customer = await CreateStripeCustomer(body.email);

  return NextResponse.json({ result: customer }, { status: 200 });
};
