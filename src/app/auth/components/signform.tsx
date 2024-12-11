"use client";

import LocalStorage from "@/src/utils/LocalStorage";
import ToastError from "../../../components/error/toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ISignform, SignType } from "@/src/interfaces/auth/ISignform";
import { useGlobalContext } from "@/src/components/global-context";

const SignForm = ({ data }: { data: ISignform }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { token, setToken } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let endpoint;
    switch (data.type) {
      case SignType.Signup:
        endpoint = `/api/auth/signup`;
        break;

      case SignType.Signin:
        endpoint = `/api/auth/signin`;
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.message);
        throw new Error(body.message);
      }

      // const { token } = await response.json();

      LocalStorage.setItem("jwt", body.token);
      setToken(body.token);

      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">{data.type == SignType.Signin ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit} className="bg-base-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errorMessage && <ToastError errorMsg={errorMessage} />}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {data.type == SignType.Signin ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignForm;
