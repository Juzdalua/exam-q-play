"use client";

import ConnectForm from "@/src/app/auth/components/connectform";
import { useGlobalContext } from "@/src/components/global-context";
import { ConnectType } from "@/src/interfaces/auth/IConnectform";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ConnectPage = () => {
  const router = useRouter();
  const { token } = useGlobalContext();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [router]);

  const connectData = {
    type: ConnectType.Connect,
  };

  return (
    <div>
      <ConnectForm data={connectData} />
    </div>
  );
};

export default ConnectPage;
