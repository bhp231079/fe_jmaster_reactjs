import { Navigate } from "react-router-dom";
import { useAuth } from "../CustomHook/AuthContext";




export const ProtectedRoute = ({ children }) => {
  const roles = useAuth(); 
  console.log(roles);
    if (roles?.find((value,index) => value==='ROLE_MEMBER')) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};