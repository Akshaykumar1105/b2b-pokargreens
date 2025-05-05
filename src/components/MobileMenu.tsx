import { useEffect } from "react";
import {
  X,
  Home,
  Apple,
  Carrot,
  Phone,
  LogOut,
  User,
  LayoutDashboard,
  PhoneOutgoing,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/pages/AuthContext"; // Make sure this is your actual auth context
import {  ShoppingBag } from "lucide-react";

const headerStyle = {
  width: "74px",
  height: "auto",
  display: "block",
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout?: () => void;
  isLoggedIn?: boolean;
}

const MobileMenu = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  onLogout,
  isLoggedIn,
}: MobileMenuProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    onLogin();
  };

  const handleSignup = () => {
    onClose();
    onSignup();
  };

  const handleLogout = () => {
    onClose();
    if (onLogout) onLogout();
  };

  const goToDashboard = () => {
    onClose();
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}>
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 p-5 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <img
            style={headerStyle}
            src="/assets/imgs/POKAR-GREENS-Logo.svg"
            alt="POKAR-GREENS-Logo"
          />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        <nav className="space-y-6 mt-4">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
            onClick={onClose}
          >
            <Home className="text-harvest-green-500" size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/products"
            className="flex items-starts space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
            onClick={onClose}
          >
            <Apple className="text-harvest-orange-500" size={20} />
            <span className="font-medium">Products</span>
          </Link>

          {/* <Link
            to="/categories"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
            onClick={onClose}
          >
            <Carrot className="text-harvest-yellow-500" size={20} />
            <span className="font-medium">Categories</span>
          </Link> */}

          <Link
            to="/about"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
            onClick={onClose}
          >
            <Phone className="text-harvest-green-500" size={20} />
            <span className="font-medium">About Us</span>
          </Link>

          <Link
            to="/contact"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
            onClick={onClose}
          >
            <PhoneOutgoing className="text-harvest-green-500" size={20} />
            <span className="font-medium">Contact Us</span>
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/my-profile"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors w-full text-left"
              >
                <User className="text-harvest-green-500" size={20} />
                <span className="font-medium">My Profile</span>
              </Link>

              <Link
                to="/my-orders"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors w-full text-left"
              >
                <ShoppingBag className="text-harvest-green-500" size={20} />
                <span className="font-medium">My Orders</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 w-full text-left"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>

            </>
          )}
        </nav>

        {!isLoggedIn && (
          <div className="mt-10 space-y-3 px-3">
            <Button
              onClick={handleLogin}
              className="w-full bg-white border border-harvest-green-600 text-harvest-green-600 hover:bg-harvest-green-50"
            >
              Login
            </Button>

            <Button
              onClick={handleSignup}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Sign Up
            </Button>
          </div>
        )}

        {isLoggedIn && currentUser?.name && (
          <div className="mt-6 px-3 text-sm text-gray-500">
            Logged in as <span className="font-semibold">{currentUser.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;