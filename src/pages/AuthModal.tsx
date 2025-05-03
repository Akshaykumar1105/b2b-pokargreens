import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "signup" | "forgot";
}

const AuthModal = ({ isOpen, onClose, initialView = "login" }: AuthModalProps) => {
  const [activeView, setActiveView] = useState<"login" | "signup" | "forgot">(initialView);

  useEffect(() => {
    if (isOpen && initialView) {
      setActiveView(initialView);
    }
  }, [isOpen, initialView]);

  const switchToLogin = () => setActiveView("login");
  const switchToSignup = () => setActiveView("signup");
  const switchToForgotPassword = () => setActiveView("forgot");

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-sm">
        {activeView === "login" && (
          <LoginForm
            onSwitchToSignup={switchToSignup}
            onSwitchToForgotPassword={switchToForgotPassword}
            onSuccess={handleSuccess}
          />
        )}

        {activeView === "signup" && (
          <SignUpForm
            onSwitchToLogin={switchToLogin}
            onSuccess={handleSuccess}
          />
        )}

        {activeView === "forgot" && (
          <ForgotPasswordForm
            onSwitchToLogin={switchToLogin}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
