import { NextResponse } from "next/server";
import { signToken } from "@/src/lib/jwt";
import bcrypt from "bcrypt";
import { AuthService } from "@/src/services/auth/auth.service";
import { isValidEmail } from "@/src/utils/Utils";
import { Account } from "@/src/interfaces/auth/account.dto";

export const POST = async (req: Request) => {
  // const body = await req.json();
  const { email, password } = await req.json();
  if (!isValidEmail(email)) return NextResponse.json({ success: false, message: "Invalid Eamil" }, { status: 401 });

  const account:Account = await AuthService.GetAccountByEmail(email);
  if(!account) return NextResponse.json({ success: false, message: "Not Join Email" }, { status: 400 });
  if(!await bcrypt.compare(password, account.password)) return NextResponse.json({ success: false, message: "Invalid Password" }, { status: 400 });

  const token = signToken({ accountId: account.id });
  return NextResponse.json({ success: true, token });
};
