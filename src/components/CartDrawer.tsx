import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X, Plus, Minus, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Your Cart
            </h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.product.media?.url ?? '/default-image.jpg'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-base">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.variant.weight} {item.variant.unit}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded">
                          <button
                            className="px-2 py-1 hover:text-harvest-green-500"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.variantId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button
                            className="px-2 py-1 hover:text-harvest-green-500"
                            onClick={() =>
                              updateQuantity(item.productId, item.variantId, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <div className="space-y-2">
                <Button
                  className="w-full bg-harvest-green-500 hover:bg-harvest-green-600"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button variant="outline" className="w-full text-gray-600" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
