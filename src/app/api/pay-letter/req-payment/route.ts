import PayLetter from "@/src/utils/pay-letter/payLetter";
import { errorResponse, successResponse } from "@/src/utils/Utils";
import { NextRequest } from "next/server";

export interface PayLetterRequestPayment {
  token: number;
  online_url: string;
  mobile_url: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const body: any = await req.json();
    const res = await PayLetter.getInstance().reqPayment(body.pgcode, body.product_name, body.user_id, body.amount);
    return successResponse(res);
  } catch (error) {
    console.error(error);
    return errorResponse(500, "Failed to PayLetter Request Payment");
  }
};
