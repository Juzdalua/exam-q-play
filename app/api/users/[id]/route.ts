import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;

  return NextResponse.json({
    success: true,
    result: {
      id: id,
      name: "kj",
    },
  });
};
