import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoadingScreen = () => (
  <div className="flex min-h-screen items-center justify-center bg-stone-100 dark:bg-stone-950">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
  </div>
);

const getHomePathForRole = (role) => {
  if (role === "admin") {
    return "/admin-dashboard";
  }
  if (role === "user") {
    return "/dashboard";
  }
  return "/login";
};

const RoleRoute = ({ allowedRole, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to={getHomePathForRole(user.role)} replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => (
  <RoleRoute allowedRole="admin">{children}</RoleRoute>
);

export const UserRoute = ({ children }) => (
  <RoleRoute allowedRole="user">{children}</RoleRoute>
);

export const AuthenticatedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleRoute;
