"use client";

import { useState } from "react";
import TopLayout from "./top-layout";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { GlobalContextProvider } from "../../../../components/global-context";

export default function MainComponent({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <GlobalContextProvider>
        <TopLayout onSideBarToggle={() => setIsSidebarVisible(!isSidebarVisible)} />
        <div className="flex flex-1">
          <Sidebar isVisible={isSidebarVisible} />
          <div className={`${isSidebarVisible ? "ml-56" : ""} flex-1`}>{children}</div>
        </div>
        <Footer />
      </GlobalContextProvider>
    </div>
  );
}
