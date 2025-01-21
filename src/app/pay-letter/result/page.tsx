import { Metadata } from "next";
import PayLetterResultComponent from "./components/result";

export const metadata: Metadata = {
  title: "Pay-Letter | Result",
};

const PayLetterResultPage = () => {
  return (
    <div>
      <PayLetterResultComponent />
    </div>
  );
};

export default PayLetterResultPage;
