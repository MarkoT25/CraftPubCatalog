import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, isUserLoading } = useAuth();
  const location = useLocation();

  if (isLoading || isUserLoading) {
    return <LoadingSpinner size="xl" />;
  }

  // If route requires auth and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login and save the attempted location
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If route requires NO auth (like login/register) and user IS authenticated
  if (!requireAuth && isAuthenticated) {
    // Get the original destination or default to home
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
