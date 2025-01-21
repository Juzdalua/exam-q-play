"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const PayLetterCallbackComponent = async () => {
  useEffect(() => {}, []);
  const searchParams = useSearchParams();
  console.log(searchParams);

  return <div></div>;
};

export default PayLetterCallbackComponent;
