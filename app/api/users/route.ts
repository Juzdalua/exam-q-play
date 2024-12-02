import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const GET = async () => {
  let rows;
  try {
    [rows] = await db.query(`SELECT * FROM user`);
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    result: rows,
  });
};
