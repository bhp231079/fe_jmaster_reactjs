import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../systemSetting";

import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem(userInfo))
  const  {roles} = user

  return <AuthContext.Provider value={roles}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};