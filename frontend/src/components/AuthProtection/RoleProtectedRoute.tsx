import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { LoadingSpinner } from "../ui/loading-spinner";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const RoleProtectedRoute = ({
  children,
  allowedRoles = [],
  redirectTo = "/unauthorized",
}: RoleProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading, isUserLoading } = useAuth();
  const location = useLocation();

  if (isLoading || isUserLoading) {
    return <LoadingSpinner size="xl" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role (assuming user has a role property)
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
