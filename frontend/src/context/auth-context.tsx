import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/lib/auth.fetching";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  isUserLoading: boolean;
  refetchUser: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  const {
    data: user,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: !!token,
  });

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("jwt", newToken);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
    queryClient.clear();
  };

  const value: AuthContextType = {
    user: user || null,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isUserLoading: isUserLoading,
    isLoading,
    refetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
