import { useState } from "react";
import {
  isAuthenticated,
  getUserRole,
  decodeToken,
  removeToken,
} from "../utils/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = () => {
    const authenticated = isAuthenticated();
    const userRole = getUserRole();
    console.log("Decoded Token:", decodeToken());
    setIsLoggedIn(authenticated);
    setRole(userRole);
    setLoading(false);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  return {
    isLoggedIn,
    role,
    loading,
    logout,
    isAdmin: role === "admin",
    isUser: role === "user",
    checkAuth,
  };
};
