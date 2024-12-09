import RootPage from "@/src/app/(home)/components/root/root-page";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
};

const Start = async () => {
  return (
    <div>
      {/* <Suspense fallback={<h1>Loading User List...</h1>}>
          <UserList />
        </Suspense>
        <Suspense fallback={<h1>Loading User List...</h1>}>
          <UserInfo id="1" />
        </Suspense> */}
      <Suspense fallback={""}>
        <RootPage />
      </Suspense>
    </div>
  );
};

export default Start;
