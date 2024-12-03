import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export const POST = async (req: Request) => {
  const { username, password } = await req.json();

  if (username === "admin" && password === "password") {
    const token = signToken({ username });

    return NextResponse.json({ success: true, token });
  }

  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
};
