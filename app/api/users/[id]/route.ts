import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;

  let rows;
  try {
    [rows] = await db.query(`SELECT * FROM user WHERE id = ${id}`);
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    result: rows,
  });
};
