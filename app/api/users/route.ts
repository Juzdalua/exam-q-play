import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    success: true,
    result: {
      id: 1,
      name: "kj",
    },
  });
};
