"use client";

import Link from "next/link";
import { useGlobalContext } from "../../../../components/global-context";
import ToggleHambugerButton from './toggle-button';

const TopLayout = ({ onSideBarToggle }: { onSideBarToggle: () => void }) => {
  const { token, setToken } = useGlobalContext();

  return (
    <div className="min-h-20 bg-neutral flex justify-between">
      {/* Left */}
      {/* <ToggleHambugerButton onSideBarToggle={onSideBarToggle} /> */}

      {/* Right */}
      <div className="flex w-full justify-end">
        <ul className="menu menu-horizontal content-center">
        <li>
            <Link href={`/test`}>Test</Link>
          </li>
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/room`}>
              Room
            </Link>
          </li>
          <li>
            <Link href={`/auth/connect`} className={token ? "hidden" : ""}>
              Connect
            </Link>
          </li>
          <li>
            <Link href={`/auth/disconnect`} className={token ? "" : "hidden"}>
              Disconnect
            </Link>
          </li>
          {/* <li>
            <Link href={`/auth/signin`} className={token ? "hidden" : ""}>
              Signin
            </Link>
          </li>
          <li>
            <Link href={`/auth/signup`} className={token ? "hidden" : ""}>
              Signup
            </Link>
          </li>
          <li>
            <Link href={`/auth/logout`} className={!token ? "hidden" : ""}>
              Logout
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default TopLayout;
