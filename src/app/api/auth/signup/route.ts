import { NextResponse } from "next/server";
import { signToken } from "@/src/lib/jwt";
import bcrypt from "bcrypt";
import { AuthService } from "@/src/services/auth/auth.service";
import { isValidEmail } from "@/src/utils/Utils";

export const POST = async (req: Request) => {
  // const body = await req.json();
  const { email, password } = await req.json();
  if (!isValidEmail(email)) return NextResponse.json({ success: false, message: "Invalid Eamil" }, { status: 400 });

  const saltRounds = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createAccountId = await AuthService.createAccount(email, hashedPassword);
  if (createAccountId == -1) return NextResponse.json({ success: false, message: "Email alredy exists." }, { status: 400 });
  else if (createAccountId == -2) return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });

  const token = signToken({ accountId: createAccountId });
  return NextResponse.json({ success: true, token });
};
