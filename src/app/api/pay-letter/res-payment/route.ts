import { NextRequest, NextResponse } from "next/server";

export interface PayLetterPaymentResponse {
  tid?: string;
  cid?: string;
  pay_info?: string;
  amount?: string;
  taxfree_amount?: string;
  tax_amount?: string;
  nonsettle_amount?: string;
  payhash?: string;
  domestic_flag?: string;
  receipt_possible_amount?: string;
  coupon_amount?: string;
  card_info?: string;
  install_month?: string;
  discount_amount?: string;
  pointuse_flag?: string;
  card_code?: string;
  pgcode?: string;
  user_id?: string;
  user_name?: string;
  service_name?: string;
  product_name?: string;
  custom_parameter?: string;
  order_no?: string;
  transaction_date?: string;
  code?: string;
  message?: string;
}

export const POST = async (req: NextRequest) => {
  try {
    if (req.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
      const urlEncodedBody = await req.text(); // 요청 본문을 text로 받아옴
      const params = new URLSearchParams(urlEncodedBody); // URLSearchParams로 파싱
      const parsedData: PayLetterPaymentResponse = Object.fromEntries(params.entries());
      console.log("Parsed Form Data:", parsedData);
      return NextResponse.json({ data: parsedData }, { status: 200 });
    }

    return NextResponse.json({ data: {} }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to Request Payment" }, { status: 500 });
  }
};
