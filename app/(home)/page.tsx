import { Metadata } from "next";
import UserList from "../../components/user-list";
import { Suspense } from "react";
import UserInfo from "../../components/user-info";

export const metadata: Metadata = {
  title: "Home",
};

const Start = async () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold underline text-red-400">HI</h1>
      </div>
      <div>
        <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
          Button
        </button>
      </div>
      <div>
        <Suspense fallback={<h1>Loading User List...</h1>}>
          <UserList />
        </Suspense>
        <Suspense fallback={<h1>Loading User List...</h1>}>
          <UserInfo id="1" />
        </Suspense>
      </div>
    </div>
  );
};

export default Start;
