import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";  // ✅ Import UserContext

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProtectedRoutes() {
  const { user, setUser } = useContext(UserContext);
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/auth/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser((prev) => ({
          ...prev,
          firstName: response.data.firstName,
          userId: response.data.userId,
        }));

        setIsValid(true);
      } catch (error) {
        setIsValid(false);
        setUser(null);
        localStorage.removeItem("token");
      }
    };

    validateToken();
  }, [token, setUser]);

  useEffect(() => {
    if (!user?.userId) return; // Wait until userId is set

    const getUserBalance = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/account/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser((prev) => ({
          ...prev,
          balance: response.data.balance,
        }));
      } catch (error) {
        console.log(`Error fetching balance: ${error}`);
        setIsValid(false);
      }
    };

    getUserBalance();
  }, [token, user?.userId, setUser]);

  if (isValid === null) {
    return <p>Loading...</p>;
  }

  return isValid ? <Outlet /> : <Navigate to="/signin" replace />;
}

export default ProtectedRoutes;
