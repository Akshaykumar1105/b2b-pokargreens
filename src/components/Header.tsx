import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { User, Settings, LogOut } from "lucide-react";
import MobileMenu from "./MobileMenu";
import CartIndicator from "./CartIndicator";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import AuthModal from "@/pages/AuthModal";
import { useAuth } from "@/pages/AuthContext";
import CartDrawer from "./CartDrawer";

const headerStyle = {
  width: "120px",
  display: "block",
  maxWidth: "100%",  // Changed from max-width to maxWidth
};

const Header = () => {
  const { isLoggedIn, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const isMobile = useIsMobile();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Check if auth token exists in localStorage
  const isAuthenticated = localStorage.getItem("authToken") ? true : false;

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openLoginModal = () => {
    setAuthType("login"); // Ensure authType is set to "login" here
    setIsAuthModalOpen(true);
    document.body.classList.add("my-custom-class");
  };

  const openSignupModal = () => {
    setAuthType("signup"); // Ensure authType is set to "signup" here
    setIsAuthModalOpen(true);
    document.body.classList.add("my-custom-class");
  };


  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    document.body.classList.remove("my-custom-class");
  };

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out successfully");
    localStorage.removeItem("authToken");  // Remove the token from localStorage
    navigate("/");
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const getInitials = () => {
    if (!currentUser || !currentUser.name) return "U";
    return currentUser.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-2"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold main_logo_img">
              <img style={headerStyle}  src="/assets/imgs/POKAR-GREENS-Logo.svg" alt="POKAR-GREENS-Logo" />
            </Link>

            {!isMobile && (
              <nav className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-harvest-green-800 hover:text-harvest-green-600 transition-colors">
                  Home
                </Link>
                <Link to="/products" className="text-harvest-green-800 hover:text-harvest-green-600 transition-colors">
                  Products
                </Link>
                <Link to="/about" className="text-harvest-green-800 hover:text-harvest-green-600 transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-harvest-green-800 hover:text-harvest-green-600 transition-colors">
                  Contact
                </Link>
              </nav>
            )}

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
                        <Avatar className="h-8 w-8 bg-green-600 text-white">
                          <AvatarFallback>{getInitials()}</AvatarFallback>
                        </Avatar>
                        <span className="text-harvest-green-800">{currentUser?.name || 'User'}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/my-profile')}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/my-orders')}>
                        <FaBoxOpen className="mr-2 h-4 w-4" />
                        My Orders
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button onClick={openLoginModal} variant="outline" className="px-6 py-4 text-base">
                      Login
                    </Button>
                    <Button onClick={openSignupModal} className="bg-green-600 hover:bg-green-700 text-white">
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
              <CartIndicator onClick={handleCartOpen} />
              <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />

              {isMobile && (
                <>
                  <button onClick={toggleMobileMenu} className="text-harvest-green-800 focus:outline-none" aria-label="Toggle mobile menu">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    onSignup={openSignupModal}
                    onLogin={openLoginModal}
                    isLoggedIn={isAuthenticated}
                    onLogout={handleLogout}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialView={authType}
      />
    </>
  );
};

export default Header;
