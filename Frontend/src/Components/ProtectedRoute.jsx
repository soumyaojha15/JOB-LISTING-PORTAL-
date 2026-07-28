import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../Context/AppContext";

const ProtectedRoute = ({ children, role }) => {
  const { isLoggedin, userData } = useContext(AppContent);

  // While checking auth → show loading
  if (isLoggedin === null) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  // Not logged in → redirect to login
  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch → redirect to NotAuthorized page
  if (role && userData?.userType !== role) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
