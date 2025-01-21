import { Metadata } from "next";
import PayLetterIndex from "./components";

export const metadata: Metadata = {
  title: "Pay-Letter",
};

const PayLetterPage = () => {
  return (
    <div>
      <PayLetterIndex />
    </div>
  );
};

export default PayLetterPage;
