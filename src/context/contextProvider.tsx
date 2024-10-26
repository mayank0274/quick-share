"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface FileContext {
  fileId: string;
  setFileId: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<null | FileContext>(null);

export function AppContextProvider({ children }: { children: any }) {
  const [fileId, setFileId] = useState("");

  return (
    <AppContext.Provider value={{ fileId, setFileId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
