import { Button } from "@/components/ui/button";
import { ShoppingBag, User, Mail, MapPin, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import AuthModal from "@/pages/AuthModal";


const OrderSummary = ({ items }) => {
  const { clearCart } = useCart();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueProducts = new Set(items.map(item => item.productId)).size;

  const [user, setUser] = useState(null); // ✅ state to hold user data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // ✅ Fetch user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid userData JSON:', e);
      }
    }
    const token = localStorage.getItem('authToken');
    setToken(token);

    if (!token) {
      setIsAuthModalOpen(true);
    }
  }, []);

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    document.body.classList.remove("my-custom-class");
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setError('User information not available.');
      return;
    }

    const userId = user.id;
    const totalWeight = items.reduce(
      (sum, item) => sum + (item.variant.weight * item.quantity),
      0
    );

    const orderProducts = items.map(item => ({
      product_id: item.productId,
      product_variant_id: item.variantId,
      quantity: item.quantity,
    }));

    const orderData = {
      user_id: userId,
      total_weight: totalWeight,
      status: "received",
      order_products: orderProducts,
    };

    try {
      setIsLoading(true);
      setError(null);
      
      
      const response = await fetch('https://businessapi.pokargreens.com/api/v1/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }

      alert('Order placed successfully!');
      clearCart();

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <ShoppingBag className="w-6 h-6 text-harvest-green-500" />
        <h3 className="text-xl font-semibold">Order Summary</h3>
      </div>

      {/* ✅ User Info */}
      {user ? (
        <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4" />
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-4 h-4" />
            <span>{user.address}</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Loading user info...</p>
      )}

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Total Products</span>
          <span className="font-medium">{uniqueProducts}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-gray-600">Total Items</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-900">Order Details</h4>
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.variantId}`}
            className="bg-gray-50 rounded-lg p-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-gray-900 truncate">
                  {item.product.name}
                </h5>
                <p className="text-sm text-gray-600">
                  {item.variant.weight} {item.variant.unit}
                </p>
              </div>
              <span className="text-sm font-medium bg-harvest-green-100 text-harvest-green-800 px-2 py-1 rounded">
                x{item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <Button
        className="w-full bg-harvest-green-500 hover:bg-harvest-green-600 text-white"
        onClick={handlePlaceOrder}
        disabled={isLoading || !token}
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </Button>

      {/* ✅ Note */}
      <div className="mt-4 flex items-start gap-2 text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <Info className="w-4 h-4 text-yellow-500 mt-0.5" />
        <p>Note: This order will be received by tomorrow.</p>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialView={"login"}
      />
    </div>
  );
};

export default OrderSummary;
