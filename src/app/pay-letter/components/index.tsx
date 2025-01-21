"use client";

import { PaymentCode } from "@/src/utils/pay-letter/payLetterTypes";
import { useEffect, useState } from "react";

const PayLetterIndex = () => {
  const [paymentData, setPaymentData] = useState(null);
  useEffect(() => {
    const fetchPayment = async () => {
      const res = await fetch(`/api/pay-letter/req-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pgcode: PaymentCode.CREDIT_CARD,
          amount: 1000,
          product_name: "테스트상품",
          user_id: "jun"
        }),
      });

      if (res && res.status == 200) {
        const result = await res.json();
        setPaymentData(result.data);
      }
    };

    fetchPayment();
  }, []);

  useEffect(() => {
    if (!paymentData) return;
    window.open(paymentData.online_url);
  }, [paymentData]);

  return <div></div>;
};

export default PayLetterIndex;
