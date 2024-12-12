"use client";

import { useGlobalContext } from "@/src/components/global-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RoomMap = () => {
  const router = useRouter();
  const { token, setToken } = useGlobalContext();
  useEffect(() => {
    if (!token) {
      router.push("/auth/connect");
    }
  }, [router]);

  return (<div></div>);
};

export default RoomMap;
