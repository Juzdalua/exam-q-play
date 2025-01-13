import { createSupabaseClient } from "@/src/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const supabase = createSupabaseClient();

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  switch (id) {
    default:
    case "1": {
      // SELECT
      const { data, error } = await supabase
        .from("user") // users 테이블에서 데이터 조회
        .select("*");
      // .eq("id", user_id); // user_id로 필터링

      if (error) {
        return NextResponse.json({ message: "Error Select" }, { status: 500 });
      }
      // 데이터가 정상적으로 조회되면 클라이언트에게 전달
      return NextResponse.json({ data, id }, { status: 200 });
    }

    case "2": {
      // INSERT
      const { error } = await supabase.from("user").insert({ name: "PP", age: 1 });

      if (error) {
        return NextResponse.json({ message: "Error Insert" }, { status: 500 });
      }
      // 데이터가 정상적으로 조회되면 클라이언트에게 전달
      return NextResponse.json({}, { status: 200 });
    }

    case "3": {
      // UPDATE
      const { error } = await supabase
        .from("user")
        .update({
          name: "rk",
          age: 11,
        })
        .eq("id", 2);

      if (error) {
        return NextResponse.json({ message: "Error Insert" }, { status: 500 });
      }
      // 데이터가 정상적으로 조회되면 클라이언트에게 전달
      return NextResponse.json({}, { status: 200 });
    }
  }
};
