"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for provider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook with error if context is used outside provider
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
