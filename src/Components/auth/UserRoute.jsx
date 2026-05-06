import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "USER") {
    return <Navigate to="/manager-dashboard" />;
  }

  return children;
};

export default UserRoute;