"use client";

import SignForm from "@/src/app/auth/components/signform";
import { useGlobalContext } from "@/src/components/global-context";
import { SignType } from "@/src/interfaces/auth/ISignform";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SigninPage = () => {
  const router = useRouter();
  const { token } = useGlobalContext();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [router]);

  const signData = {
    type: SignType.Signup,
  };

  return (
    <div>
      <SignForm data={signData} />
    </div>
  );
};

export default SigninPage;
