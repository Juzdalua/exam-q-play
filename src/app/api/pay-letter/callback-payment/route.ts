import { errorResponse, successResponse } from "@/src/utils/Utils";
import { NextRequest, NextResponse } from "next/server";

export interface PayLetterPaymentCallback {
  method_info?: string;
  coupon_amount?: number;
  receipt_possible_amount?: number;
  cash_receipt?: {
    code?: string; //결과
    message?: string; //메시지
    cid?: string; //현금영수증 승인번호
    deal_no?: string; //현금영수증 발급시 주문번호
    issue_type?: string; //현금영수증 발행 구분
    payer_sid?: string; //신분확인 번호
    type?: string; //거래자구분
  };
}

export const POST = async (req: NextRequest) => {
  try {
    if (req.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
      const urlEncodedBody = await req.text(); // 요청 본문을 text로 받아옴
      const params = new URLSearchParams(urlEncodedBody); // URLSearchParams로 파싱
      const parsedData: PayLetterPaymentCallback = Object.fromEntries(params.entries());
      console.log("Parsed Form Data:", parsedData);

      // TODO - 충전로직

      return successResponse(parsedData);
    }

    return NextResponse.json({ data: {} }, { status: 200 });
  } catch (error) {
    console.error(error);
    return errorResponse(500, "Failed to PayLetter Callback");
  }
};
