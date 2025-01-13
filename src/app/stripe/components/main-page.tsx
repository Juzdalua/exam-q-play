"use client";

import Link from "next/link";

const StripeMainButton = () => {
  return (
    <div>
      <div className="flex flex-col align-middle items-center">
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-5">
          <Link href={`/stripe`}>Stripe Home</Link>
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-5">
          <Link href={`/stripe/customers`}>All Customers</Link>
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-5">
          <Link href={`/stripe/new-customer`}>Create Customer</Link>
        </button>
      </div>
    </div>
  );
};

export default StripeMainButton;
