"use client";

import { useGlobalContext } from "@/src/components/global-context";
import LocalStorage from "@/src/utils/LocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Disconnect = () => {
  const router = useRouter();
  const { token, setToken } = useGlobalContext();

  useEffect(() => {
    // LocalStorage.removeItem("jwt");
    LocalStorage.getInstance().removeItem("jwt");
    setToken(null);

    router.push("/");
  }, [router]);
};

export default Disconnect;
