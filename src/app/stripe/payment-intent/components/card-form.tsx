"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ setPaymentMethod }: { setPaymentMethod: (pm: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message || "Payment failed.");
    } else {
      setPaymentMethod(paymentMethod?.id || "");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg max-w-sm mx-auto">
      <div className="space-y-4">
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement className="border-0 p-2 focus:ring-2 focus:ring-indigo-500 rounded-md" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 disabled:bg-gray-300"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
