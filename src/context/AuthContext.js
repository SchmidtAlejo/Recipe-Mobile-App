import React, { createContext, useState, useContext } from "react";

import * as RecipeAPI from "../services/RecipeAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSigned, setIsSigned] = useState(false);

  async function Login(email, password) {
    const response = await RecipeAPI.loginUser(email, password);
    setUser(response.user);
    setToken(`Bearer ${response.token}`);
    //RecipeAPI.defaults.headers.Authorization = `Bearer ${response.token}`;
    setIsSigned(true);
  }

  function Logout() {
    setUser(null);
    setIsSigned(false);
  }

  async function Register(email, username, password) {
    const response = await RecipeAPI.registerUser(email, username, password);
    if (!response.id) {
      throw new Error("Fallo de registracion")
    }
    await Login(email, password)
  }

  return (
    <AuthContext.Provider value={{ isSigned, user, token, Login, Logout, Register }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}