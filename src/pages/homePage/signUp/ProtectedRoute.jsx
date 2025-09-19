import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ session, role, requiredRole, children }) {
  // Not logged in → send to login
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // Logged in but wrong role → redirect to their own dashboard
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/AdminDashboard" : "/UserDashboard"} replace />;
  }

  // Otherwise allow access
  return children;
}
