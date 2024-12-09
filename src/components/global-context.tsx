import LocalStorage from "@/src/utils/LocalStorage";
import React, { useState, createContext, useContext, useEffect } from "react";

interface IGlobalContext {
  token: string | null;
  setToken: (token: string) => void;
}

const GlobalContext = createContext<IGlobalContext | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = LocalStorage.getItem("jwt");
    if (savedToken) setToken(savedToken);
  }, []);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) LocalStorage.setItem("jwt", newToken);
    else LocalStorage.removeItem("jwt");
  };

  return <GlobalContext.Provider value={{ token, setToken: updateToken }}>{children}</GlobalContext.Provider>;
};
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  return context;
};
