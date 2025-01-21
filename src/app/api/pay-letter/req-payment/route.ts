import PayLetter from "@/src/utils/pay-letter/payLetter";
import { PaymentCode } from "@/src/utils/pay-letter/payLetterTypes";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body: any = await req.json();
    const res = await PayLetter.getInstance().reqPayment(body.pgcode, body.product_name, body.user_id, body.amount);
    console.log(res);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to Request Payment" }, { status: 500 });
  }
};
