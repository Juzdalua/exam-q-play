"use client";

import LocalStorage from "@/src/utils/LocalStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGlobalContext } from "../../(home)/components/global-context";

const Logout = () => {
  const router = useRouter();
  const { token, setToken } = useGlobalContext();

  useEffect(() => {
    LocalStorage.removeItem("jwt");
    setToken(null);

    router.push("/");
  }, [router]);
};

export default Logout;
