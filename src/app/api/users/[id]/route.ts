import { conn } from "@/src/utils/Connection";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = await params;

  const query = `SELECT * FROM user WHERE id = ${id}`;
  const data = await conn.Query(query);

  return NextResponse.json({
    success: true,
    result: data,
  });
};
