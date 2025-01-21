import { Metadata } from "next";
import PayLetterCallbackComponent from "./components/callback";

export const metadata: Metadata = {
  title: "Pay-Letter | Callback",
};

const PayLetterCallbackPage = () => {
  return (
    <div>
      <PayLetterCallbackComponent />
    </div>
  );
};

export default PayLetterCallbackPage;
