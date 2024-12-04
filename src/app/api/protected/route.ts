import { NextResponse } from "next/server";
import { verifyToken } from "@/src/lib/jwt";

export const GET = async (req: Request) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    return NextResponse.json({ success: true, data: decoded });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 403 });
  }
};
