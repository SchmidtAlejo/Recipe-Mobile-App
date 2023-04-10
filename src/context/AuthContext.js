import React, { createContext, useState, useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import * as RecipeAPI from "../services/RecipeAPI";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSigned, setIsSigned] = useState(false);

  async function Login(email, password) {
    const response = await RecipeAPI.loginUser(email, password);
    setUser(response.user);
    const token= `Bearer ${response.token}`;
    setToken(token);
    await AsyncStorage.setItem('token', token);
    setIsSigned(true);
  }

  async function LoginByToken(token) {
    const response = await RecipeAPI.getUser(token);
    console.log(response);
    setUser(response);
    setToken(token);
    setIsSigned(true);
  }

  async function Logout() {
    setUser(null);
    setIsSigned(false);
    await AsyncStorage.setItem('token', '');
  }

  async function Register(email, username, password) {
    const response = await RecipeAPI.registerUser(email, username, password);
    if (!response.id) {
      throw new Error("Fallo de registracion");
    }
    await Login(email, password);
  }

  return (
    <AuthContext.Provider
      value={{ isSigned, user, token, Login, Logout, Register, LoginByToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
