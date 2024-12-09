"use client";

import { useGlobalContext } from "@/src/app/(home)/components/global-context";
import { ConnectType, IConnectForm } from "@/src/interfaces/auth/IConnectform";
import LocalStorage from "@/src/utils/LocalStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ToastError from "../error/toast";

const ConnectForm = ({ data }: { data: IConnectForm }) => {
  const [name, setName] = useState("");
  const [side, setSide] = useState("wife");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { token, setToken } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let endpoint;
    switch (data.type) {
      case ConnectType.Connect:
        endpoint = `/api/auth/connect`;
        break;

      case ConnectType.Disconnect:
        endpoint = `/api/auth/disconnect`;
        break;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, side }),
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
      <h1 className="text-2xl font-bold mb-4">{data.type == ConnectType.Connect ? "Connect" : "Disconnect"}</h1>
      <form onSubmit={handleSubmit} className="bg-base-200 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errorMessage && <ToastError errorMsg={errorMessage} />}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Nickname
          </label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="form-control">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Side
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">신부측</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-purple-500"
              value={"wife"}
              onChange={(e) => setSide(e.target.value)}
              checked={side == "wife"}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">신랑측</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-green-500"
              value={"husband"}
              onChange={(e) => setSide(e.target.value)}
              checked={side == "husband"}
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {data.type == ConnectType.Connect ? "Connect" : "Disconnect"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConnectForm;
