import { Metadata } from "next";
import NewCustomer from "./components/new-customer";

export const metadata: Metadata = {
  title: "Stripe - New Customer",
};

const NewCustomerPage = () => {
  return (
    <div>
      <NewCustomer />
    </div>
  );
};

export default NewCustomerPage;
