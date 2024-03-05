import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role===allowedRole ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (allowedRole ?
    <Navigate to="/student/login" state={{ from: location }} replace /> : 
    <Navigate to="/instructor/login" state={{ from: location }} replace /> 
  );
};

export default RequireAuth;
