import { Metadata } from "next";
import Customers from "./components/customers";

export const metadata: Metadata = {
  title: "Stripe - All Customers",
};

const CustomersPage = () => {
  return (
    <div>
      <Customers />
    </div>
  );
};

export default CustomersPage;
