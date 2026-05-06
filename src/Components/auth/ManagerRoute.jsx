import { Navigate } from "react-router-dom";

const ManagerRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Not a manager
  if (role !== "MANAGER") {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
};

export default ManagerRoute;