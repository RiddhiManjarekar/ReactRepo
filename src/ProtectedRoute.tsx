import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";

interface ProtectedRouteProps {
  role: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, children }) => {
  const { state } = useGlobalContext();

  if (!state.user || state.user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
