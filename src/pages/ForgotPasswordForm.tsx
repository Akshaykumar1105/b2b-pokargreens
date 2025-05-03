import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToLogin,
}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"enter-phone" | "enter-otp" | "reset-password">("enter-phone");
  const [errors, setErrors] = useState<string | null>(null);

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      setErrors("Enter a valid 10-digit phone number");
      return;
    }

    setErrors(null);

    // Simulate OTP send
    toast.success("OTP sent to your phone");
    setStep("enter-otp");
  };

  const handleVerifyOtp = () => {
    if (otp !== "123456") {
      setErrors("Invalid OTP. Try again.");
      return;
    }

    setErrors(null);
    toast.success("OTP verified");
    setStep("reset-password");
  };

  const handleResetPassword = () => {
    if (!password || password.length < 6) {
      setErrors("Password must be at least 6 characters");
      return;
    }

    const usersData = localStorage.getItem("users");
    if (!usersData) {
      setErrors("No users found");
      return;
    }

    const users = JSON.parse(usersData);
    const updatedUsers = Array.isArray(users)
      ? users.map((user: any) =>
          user.phone === phone ? { ...user, password } : user
        )
      : users.phone === phone
      ? { ...users, password }
      : users;

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    toast.success("Password reset successfully");
    onSwitchToLogin();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Forgot Password</h2>

      {errors && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{errors}</div>
      )}

      {step === "enter-phone" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <Button onClick={handleSendOtp} className="w-full bg-green-600 hover:bg-green-700">
            Send OTP
          </Button>
        </div>
      )}

      {step === "enter-otp" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <Button onClick={handleVerifyOtp} className="w-full bg-green-600 hover:bg-green-700">
            Verify OTP
          </Button>
        </div>
      )}

      {step === "reset-password" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleResetPassword} className="w-full bg-green-600 hover:bg-green-700">
            Reset Password
          </Button>
        </div>
      )}

      <p className="mt-4 text-sm text-center text-gray-600">
        Remember your password?{" "}
        <button
          className="text-green-600 font-medium hover:underline"
          onClick={onSwitchToLogin}
        >
          Back to login
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
