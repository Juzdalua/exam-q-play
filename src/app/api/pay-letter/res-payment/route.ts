import { NextRequest, NextResponse } from "next/server";

export interface PayLetterPaymentResponse {
  tid?: string;
  cid?: string;
  pay_info?: string;
  amount?: number;
  taxfree_amount?: number;
  tax_amount?: number;
  nonsettle_amount?: string;
  payhash?: string;
  domestic_flag?: string;
  receipt_possible_amount?: string;
  coupon_amount?: string;
  card_info?: string;
  install_month?: number;
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

  // 가상계좌
  account_no?: string; //가상계좌 번호
  account_name?: string; //가상계좌 입금자명
  account_holder?: string; //가상계좌 예금주명
  bank_code?: string; //가상계좌 은행 코드
  bank_name?: string; //가상계좌 은행명
  issue_tid?: string; //가상계좌 채번 승인번호
  expire_date?: string; //가상계좌 입금만료일 (ex: 20210808)
  expire_time?: string; //가상계좌 만료시각 (ex: 1130)

  // 현금영수증증
  cash_receipt_code?: string; //실패 코드
  cash_receipt_message?: string; //실패 메시지
  cash_receipt_type?: string; //거래자구분(01:소득공제용, 02:사업자지출증빙용)
  cash_receipt_issue_type?: string; //현금영수증 발행 구분(1:구매자발급, 2:자체발급)
  cash_receipt_cid?: string; //현금영수증 승인번호
  cash_receipt_payer_sid?: string; //신분확인 번호(휴대폰번호, 사업자번호)
  cash_receipt_deal_no?: string; //현금영수증 발급시 전달받은 주문번호
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
