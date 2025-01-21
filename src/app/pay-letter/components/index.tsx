"use client";

import { PaymentCode } from "@/src/utils/pay-letter/payLetterTypes";

const HandleClickBtn = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch(`/api/pay-letter/req-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pgcode: PaymentCode.CREDIT_CARD,
      amount: 1000,
      product_name: "테스트상품",
      user_id: "jun",
    }),
  });

  if (res && res.status == 200) {
    const result = await res.json();
    console.log(result);
    window.open(result.data.online_url);
  }
};

const PayLetterIndex = () => {
  return (
    <div className="flex items-center justify-center">
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg mt-5" onClick={HandleClickBtn}>
        Pay
      </button>
    </div>
  );
};

export default PayLetterIndex;
