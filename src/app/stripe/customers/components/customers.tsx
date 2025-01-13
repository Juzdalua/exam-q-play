"use client";

import { useEffect, useState } from "react";

export const handleGetStripeCustomer = async () => {
  const res = await fetch(`/api/stripe/customers`);
  const data: any = await res.json();
  return data.result;
};

const Customers = () => {
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await handleGetStripeCustomer();
      if (data && data.data.length > 0) {
        setCustomers(data.data);
      }
    };
    fetchCustomer();
  }, []);

  return (
    <div>
      <h1>All Customers</h1>
      <div>
        {customers && customers.length > 0 ? (
          customers.map((customer: { id: string; email: string }) => (
            <div key={customer.id} className="mb-4">
              <div>
                <strong>ID:</strong> {customer.id}
              </div>
              <div>
                <strong>Email:</strong> {customer.email}
              </div>
            </div>
          ))
        ) : (
          <div>"Loading..."</div>
        )}
      </div>
    </div>
  );
};

export default Customers;
