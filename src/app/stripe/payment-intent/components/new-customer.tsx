"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./card-form";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLISH_KEY_TEST!);

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const response = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod,
          amount: 5000,
          currency: "usd",
        }),
      });

      const data = await response.json();
      setCustomerData(data);
    };

    if (paymentMethod && paymentMethod.trim() != "") {
      fetchPaymentIntent();
    }
  }, [paymentMethod]);

  useEffect(() => {
    const handleConfirm = async () => {
      if (!customerData.paymentIntent.next_action && customerData.paymentIntent.status == "succeeded") {
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/stripe`;
      }

      // 수동결제 확인
      // const stripe = await stripePromise;
      // if (!stripe) return;
      // const { error, paymentIntent } = await stripe.confirmCardPayment(customerData.clientSecret, {
      //   payment_method: paymentMethod,
      // });

      // if (error) {
      //   console.error("Payment failed", error);
      //   alert(`Payment failed: ${error.message}`);
      // } else {
      //   if (paymentIntent?.status === "succeeded") {
      //     alert("Payment was successful!");
      //   } else {
      //     alert("Unexpected payment intent state.");
      //   }
      // }
    };

    if (customerData) {
      handleConfirm();
    }
  }, [customerData]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm setPaymentMethod={setPaymentMethod} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
