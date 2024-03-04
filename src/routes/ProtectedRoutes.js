import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({children}) => {
    const token = localStorage.getItem("site");

  return token ? children : <Navigate to="/login" />
}
