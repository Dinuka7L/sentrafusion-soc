
import React from "react";

export const useAuth = () => {
  throw new Error("Authentication has been disabled in this deployment.");
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
