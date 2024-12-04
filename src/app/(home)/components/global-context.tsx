import React, { useState, createContext, useContext } from "react";

interface IGlobalContext {
  token: string | null;
  setToken: (token: string) => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  return <GlobalContext.Provider value={{ token, setToken }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
