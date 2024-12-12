"use client";

import ToastError from "@/src/components/error/toast";
import { useState } from "react";

const ChatInput = () => {
  const [chat, setChat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = `api/chat`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat }),
      });

      const body = await response.json();

      if (!response.ok) {
        setErrorMessage(body.message);
        throw new Error(body.message);
      }

      // const { token } = await response.json();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <form className="flex justify-center items-center w-full border-2 h-full" onSubmit={handleSubmit}>
      {errorMessage && <ToastError errorMsg={errorMessage} />}
      <input
        type="text"
        placeholder="채팅을 입력하세요."
        className="input input-bordered w-full max-w-xl"
        value={chat}
        onChange={(e) => setChat(e.target.value)}
      />
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-info ml-5">채팅</button>
    </form>
  );
};

export default ChatInput;
