"use client";

import LocalStorage from "@/src/utils/LocalStorage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobalContext } from "./global-context";

const TopLayout = ({ onSideBarToggle }: { onSideBarToggle: () => void }) => {
  const {token, setToken} = useGlobalContext();

  return (
    <div className="min-h-20 bg-neutral flex justify-between">
      {/* Left */}
      <div className="flex items-center ml-5">
        <label className="btn btn-circle swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onClick={onSideBarToggle} />

          {/* hamburger icon */}
          <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          {/* close icon */}
          <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      {/* Right */}
      <div className="flex justify-end">
        <ul className="menu menu-horizontal content-center">
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopLayout;
