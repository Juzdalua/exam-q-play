import { Metadata } from "next";
import StripeInputEmail from "./components/input-email";

export const metadata: Metadata = {
  title: "Stripe - New Customer, Email",
};

const NewCustomerPage = () => {
  return (
    <div>
      <StripeInputEmail />
    </div>
  );
};

export default NewCustomerPage;
