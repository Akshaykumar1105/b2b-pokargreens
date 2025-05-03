import { useEffect } from "react";
import {
  X,
  Home,
  Apple,
  Carrot,
  CalendarClock,
  Search,
  Leaf,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const menuStyle = {
  margin: 0,
  display: "flex",
};

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
}

const MobileMenu = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}: MobileMenuProps) => {
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
    onClose(); // Close mobile menu first
    onLogin(); // Then open login modal
  };

  const handleSignup = () => {
    onClose(); // Close mobile menu first
    onSignup(); // Then open signup modal
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-full bg-white shadow-lg z-50 p-5 overflow-y-auto transform ${
          isOpen ? "animate-slide-in-right" : "animate-slide-out-right"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold text-harvest-green-500">
            <img
              style={headerStyle}
              src="/assets/imgs/POKAR-GREENS-Logo.svg"
              alt="POKAR-GREENS-Logo"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} />
          </Button>
        </div>

        {/* <div className="mb-4 relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full py-2 pl-10 pr-3 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-harvest-green-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div> */}

        <nav className="space-y-6 mt-4">
          <Link
            to="/"
            style={menuStyle}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
          >
            <Home className="text-harvest-green-500" size={20} />
            <span className="font-medium">Home</span>
          </Link>

          <Link
            to="/products"
            style={menuStyle}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
          >
            <Apple className="text-harvest-orange-500" size={20} />
            <span className="font-medium">Products</span>
          </Link>

          <Link
            to="/categories"
            style={menuStyle}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
          >
            <Carrot className="text-harvest-yellow-500" size={20} />
            <span className="font-medium">Categories</span>
          </Link>

          <Link
            to="/about"
            style={menuStyle}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
          >
            <Phone className="text-harvest-green-500" size={20} />
            <span className="font-medium">About Us</span>
          </Link>

          <Link
            to="/contact"
            style={menuStyle}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-harvest-green-50 transition-colors"
          >
            <Phone className="text-harvest-green-500" size={20} />
            <span className="font-medium">Contact Us</span>
          </Link>
        </nav>

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
      </div>
    </div>
  );
};

export default MobileMenu;
