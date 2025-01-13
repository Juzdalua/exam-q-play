import stripe from "@/src/utils/stripe/stripe";
import { NextRequest, NextResponse } from "next/server";

const CreateStripeCustomer = async () => {
  const customer = await stripe.customers.create({
    email: "test@exam.com"
  });

  return customer;
}

const GetSrtipeCustomer = async() => {
  const customers = await stripe.customers.list();
  return customers;
}

export const GET = async (req: NextRequest) => {
  // const customer = await CreateStripeCustomer();
  const customers = await GetSrtipeCustomer();
  console.log(customers)

  return NextResponse.json({result: customers}, {status: 200});
}