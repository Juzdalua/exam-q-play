import ConnectForm from "@/src/app/auth/components/connectform";
import { ConnectType } from "@/src/interfaces/auth/IConnectform";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect",
};

const ConnectPage = () => {
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
