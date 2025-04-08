import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Define the props for the ProtectedRoute component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if the user is authenticated (using cookies in this case)
  const auth = Cookies.get("authToken");

  return auth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
