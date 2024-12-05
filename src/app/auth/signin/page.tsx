"use client";

import SignForm from "@/src/components/auth/signform";
import { SignType } from "@/src/interfaces/auth/ISignform";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGlobalContext } from "../../(home)/components/global-context";

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
