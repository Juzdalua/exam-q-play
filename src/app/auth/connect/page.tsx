"use client";

import ConnectForm from "@/src/components/auth/connectform";
import { ConnectType } from "@/src/interfaces/auth/IConnectform";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGlobalContext } from "../../(home)/components/global-context";

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
