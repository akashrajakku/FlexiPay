import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ProtectedRoutes() {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/signin" replace />;

  return <Outlet />;
}

export default ProtectedRoutes;
