import { Guest } from "@/src/interfaces/auth/guest.dto";
import { signToken } from "@/src/lib/jwt";
import { AuthService } from "@/src/services/auth/auth.service";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  // const body = await req.json();
  const { name, password, side } = await req.json();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const guest: Guest | number = await AuthService.CreateOrGetGuest(name, hashedPassword, side);
  if (typeof guest != "number") {
    if (!(await bcrypt.compare(password, guest.password))) return NextResponse.json({ success: false, message: "Invalid Password" }, { status: 401 });

    const token = signToken({ accountId: guest.id });
    return NextResponse.json({ success: true, token });
  } else {
    if (guest == -1) return NextResponse.json({ success: false, message: "Name & Side already exists." }, { status: 400 });
    else if (guest == -2) return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
};
