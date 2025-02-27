import React, { createContext, ReactNode, useContext } from "react";
import { useGlobalContext } from "./GlobalContext";

interface AuthContextType {
  authState: { isAuthenticated: boolean; userRole: "admin" | "user" | null };
  login: (role: "admin" | "user") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { state, dispatch } = useGlobalContext();

  const login = (role: "admin" | "user") => {
    dispatch({ type: "LOGIN", payload: role });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ authState: state.auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
