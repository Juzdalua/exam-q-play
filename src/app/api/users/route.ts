import { conn } from "@/src/utils/Connection";
import { NextResponse } from "next/server";

export const GET = async () => {
  const query = `SELECT * FROM user`;
  const data = await conn.Query(query);

  return NextResponse.json({
    success: true,
    result: data,
  });
};
