import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/pages/AuthContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").trim(),
  email: yup.string().email("Invalid email address").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  address: yup.string().required("Address is required").trim(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms")
    .required("You must agree to the terms"),
});

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
    if (errors.agreeTerms) setErrors((prev) => ({ ...prev, agreeTerms: "" }));
  };

  const validate = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;
    setIsLoading(true);

    try {
      const response = await fetch("https://businessapi.pokargreens.com/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          address: formData.address,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);


        login({
          id: data.user?.id || undefined,
          name: formData.name,
          email: formData.email,
        });

        navigate("/dashboard");
      } else {
        toast.error("Signup failed");
        setErrors({ auth: data.message || "Signup error" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({ auth: "Signup failed. Try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.auth && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200">
            <p className="text-red-600">{errors.auth}</p>
          </div>
        )}

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            type="text"
            id="signup-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email Address</Label>
          <Input
            type="email"
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div className="space-y-2">
          <Label htmlFor="signup-mobile">Mobile Number</Label>
          <Input
            type="text"
            id="signup-mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={errors.mobile ? "border-red-500" : ""}
            placeholder="9876543210"
          />
          {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="signup-address">Address</Label>
          <Input
            type="text"
            id="signup-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "border-red-500" : ""}
            placeholder="123 Main St"
          />
          {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            type="password"
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500" : ""}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
          <Input
            type="password"
            id="signup-confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "border-red-500" : ""}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Agree to terms */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeTerms"
            checked={formData.agreeTerms}
            onCheckedChange={handleCheckboxChange}
            className="mt-1"
          />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="agreeTerms" className="text-sm font-normal">
              I agree to the{" "}
              <a href="#" className="text-green-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-600 hover:underline">
                Privacy Policy
              </a>
            </Label>
            {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-green-600 hover:text-green-500 focus:outline-none"
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
