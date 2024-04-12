import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.role === allowedRole ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : allowedRole === 1 ? (
    <Navigate to="/stud/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/inst/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
