import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../lib/auth.fetching";
import { FormInput } from "../../components/custom/FormInput";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

interface LoginMutation {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const from = location.state?.from?.pathname || "/";

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginMutation) =>
      loginUser(email, password),
    onSuccess: (data) => {
      console.log("Login successful:", data);
      if (data.token) {
        // Update auth context
        authLogin(data.token);
        toast.success("Login successful! Welcome back!");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        toast.error("Login failed: Invalid response from server");
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userData = {
      email: formData.email,
      password: formData.password,
    };

    loginMutation.mutate(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-200 flex flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-bold text-surface-800 mb-8 text-center">
          Welcome Back
        </h2>

        {/* Email */}
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          error={errors.email}
          autoComplete="email"
        />

        {/* Password */}
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          error={errors.password}
          autoComplete="current-password"
        />

        {/* General Error */}
        {loginMutation.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6 rounded">
            <p className="text-red-700 text-sm m-0">
              Login failed. Please check your credentials and try again.
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loginMutation.isPending ? "Signing In..." : "Sign In"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-surface-500">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-secondary-600 hover:underline font-medium"
            >
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
