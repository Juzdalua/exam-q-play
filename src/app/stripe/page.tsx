import { Metadata } from "next";
import StripeMainButton from "./components/main-page";

export const metadata: Metadata = {
  title: "Stripe",
};

const StripePage = () => {
  return (
    <div>
     <StripeMainButton />
    </div>
  );
};

export default StripePage;
