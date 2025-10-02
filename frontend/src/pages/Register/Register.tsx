import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../lib/auth.fetching";
import { FormInput } from "../../components/custom/FormInput";
import { FormGroup } from "../../components/custom/FormGroup";
import { toast } from "sonner";

interface signupMutation {
  username: string;
  email: string;
  password: string;
}

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const signupMutation = useMutation({
    mutationFn: ({ username, email, password }: signupMutation) =>
      registerUser(username, email, password),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      if (data.message === "User created successfully") {
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Navigate after 2 seconds to show success message
      } else {
        toast.error("Registration failed: " + data.message);
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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    signupMutation.mutate(userData, {
      onError: (error: any) => {
        console.error("Registration failed:", error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-200 flex flex-col items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 bg-white shadow-lg rounded-xl"
      >
        <h2 className="text-2xl font-bold text-surface-800 mb-8 text-center">
          Create Account
        </h2>

        {/* Username */}
        <FormInput
          id="username"
          name="username"
          type="text"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          placeholder="JohnDoe"
          required
          error={errors.username}
          autoComplete="username"
        />

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

        {/* Password Fields */}
        <FormGroup direction="column">
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a secure password"
            required
            error={errors.password}
            autoComplete="new-password"
            className="mb-0"
          />

          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            error={errors.confirmPassword}
            autoComplete="new-password"
            className="mb-0"
          />
        </FormGroup>

        {/* General Error */}
        {signupMutation.error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6 rounded">
            <p className="text-red-700 text-sm m-0">
              Registration failed. Please try again.
            </p>
          </div>
        )}

        {/* Terms */}
        {/* <p className="text-xs text-surface-500 text-center mt-4 mb-6">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p> */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {signupMutation.isPending ? "Creating Account..." : "Create Account"}
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-surface-500">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-secondary-600 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
