import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import AboutUs from "./pages/About";
import ContactUs from "./pages/Contact";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/Profile";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import ProfilePage from "./pages/ProfilePage";
import TermsCondition from "./pages/TermsConditions"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/cart"
                element={<CartDrawer isOpen={true} onClose={() => {}} />}
              />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              {/* <Route path="/profile" element={<Profile />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="my-profile" element={<ProfilePage />} />
              <Route path="my-orders" element={<MyOrders />} />
              <Route path="/terms-conditions" element={<TermsCondition />} />
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
