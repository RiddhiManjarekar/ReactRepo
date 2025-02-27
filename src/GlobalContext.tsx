import { createContext, useReducer, ReactNode, useContext } from "react";
import { GlobalState } from "./types";
import { globalReducer, initialState } from "./GlobalReducer";

type Action = {
  type: string;
  payload?: any;
};

const GlobalContext = createContext<{ state: GlobalState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};