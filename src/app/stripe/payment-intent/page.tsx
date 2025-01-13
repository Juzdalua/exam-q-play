import { Metadata } from "next";
import CreateNewCustomer from "./components/new-customer";

export const metadata: Metadata = {
  title: "Stripe - New Customer, Payment Intent",
};

const PaymentIntentStep = () => {
  return (
    <div>
      <CreateNewCustomer />
    </div>
  );
};

export default PaymentIntentStep;
