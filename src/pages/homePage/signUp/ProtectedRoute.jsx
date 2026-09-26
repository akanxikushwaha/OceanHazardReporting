import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ loading, session, role, requiredRole, children }) {
  if (!session && loading) {
    return <p>Checking your session...</p>;
  }

  // Not logged in → send to login
  if (!session) {
    return <Navigate to="/" replace />;
  }

  // A persisted session is enough to render immediately while the role is restored.
  if (loading) {
    return children;
  }

  // Logged in but wrong role → redirect to their own dashboard
  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === "admin" ? "/AdminDashboard" : "/UserDashboard"} replace />;
  }

  // Otherwise allow access
  return children;
}
