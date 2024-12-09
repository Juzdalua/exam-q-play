import { Guest } from "@/src/interfaces/auth/guest.dto";
import { signToken } from "@/src/lib/jwt";
import { AuthService } from "@/src/services/auth/auth.service";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  // const body = await req.json();
  const { name, side } = await req.json();

  let guest: Guest = await AuthService.GetGuestByNameNSide(name, side);

  if (!guest) guest = await AuthService.CreateGuest(name, side);
  const token = signToken({ accountId: guest.id });
  return NextResponse.json({ success: true, token });
};
