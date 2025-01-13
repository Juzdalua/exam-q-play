"use client";

import ToastError from "@/src/components/error/toast";
import router from "next/router";
import { useEffect, useState } from "react";

const NewCustomer = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [customers, setCustomers] = useState(null);

  const handleCreateCustomer = async () => {
    try {
      const response = await fetch(`/api/stripe/new-customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.message);
        throw new Error(body.message);
      }

      router.push("/stripe/new-customer");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleCreateCustomer} className="card-body">
              {errorMessage && <ToastError errorMsg={errorMessage} />}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Stripe</h1>
  //     <div>
  //       {customers && customers.length > 0 ? (
  //         customers.map((customer: { id: string; email: string }) => (
  //           <div key={customer.id} className="mb-4">
  //             <div>
  //               <strong>ID:</strong> {customer.id}
  //             </div>
  //             <div>
  //               <strong>Email:</strong> {customer.email}
  //             </div>
  //           </div>
  //         ))
  //       ) : (
  //         <div>"Loading..."</div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default NewCustomer;
