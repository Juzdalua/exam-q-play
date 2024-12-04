"use client"

import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("jwt");

    router.push("/");
  }, [router]);
}

export default Logout;