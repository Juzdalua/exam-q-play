"use client";

import { ConnectType, IConnectForm } from "@/src/interfaces/auth/IConnectform";
import { useEffect, useState } from "react";
import ToastError from "../../../components/error/toast";
import { useGlobalContext } from "@/src/components/global-context";
import LocalStorage from "@/src/utils/LocalStorage";
import { useRouter } from "next/navigation";

const ConnectForm = ({ data }: { data: IConnectForm }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [side, setSide] = useState("wife");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { token, setToken } = useGlobalContext();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [router]);

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
        body: JSON.stringify({ name, password, side }),
      });

      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.message);
        throw new Error(body.message);
      }

      // const { token } = await response.json();

      // LocalStorage.setItem("jwt", body.token);
      LocalStorage.getInstance().setItem("jwt", body.token);
      setToken(body.token);

      router.push("/");
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
            <form onSubmit={handleSubmit} className="card-body">
              {errorMessage && <ToastError errorMsg={errorMessage} />}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nickname</span>
                </label>
                <input type="text" placeholder="nickname" className="input input-bordered" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control">
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

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  {data.type == ConnectType.Connect ? "Connect" : "Disconnect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectForm;
