import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onSuccess,
}) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    auth?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  const validate = () => {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("https://businessapi.pokargreens.com/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        throw new Error("Unexpected response format");
      }

      if (!response.ok) {
        setErrors({ auth: data?.message || "Login failed" });
      } else {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        login(data.user);

        if (formData.rememberMe) {
          localStorage.setItem("rememberedUser", formData.email);
        } else {
          localStorage.removeItem("rememberedUser");
        }

        toast.success("Login successful!");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ auth: "An error occurred during login" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedUser,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Sign In to Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.auth && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-red-600">{errors.auth}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="rememberMe" className="ml-2">
              Remember Me
            </Label>
          </div>
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <div className="space-y-4 w-full">
          <Button
            type="submit"
            variant="secondary"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </Button>
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
