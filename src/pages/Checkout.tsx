import Header from "@/components/Header";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, XCircle, ShoppingBag } from "lucide-react";

const CheckoutPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const incrementQuantity = (productId: string, variantId: number, currentQuantity: number) => {
    updateQuantity(productId, variantId, currentQuantity + 1);
  };

  const decrementQuantity = (productId: string, variantId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, variantId, currentQuantity - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-4 sm:pt-8">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-harvest-green-500" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Shopping Cart</h1>
          </div>

          {cart.items.length === 0 ? (
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="mb-6">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto" />
              </div>
              <p className="text-gray-500 mb-6 text-lg">Your shopping cart is empty</p>
              <a
                href="/"
                className="inline-block bg-harvest-green-500 text-white px-8 py-3 rounded-xl hover:bg-harvest-green-600 transition-all transform hover:scale-105"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-semibold">Cart Items</h2>
                      <span className="bg-harvest-green-100 text-harvest-green-800 text-xs sm:text-sm px-2 py-1 rounded-full">
                        {cart.items.length} items
                      </span>
                    </div>
                    <button
                      onClick={clearCart}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 text-red-500 hover:text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg transition-colors"
                    >
                      <XCircle size={18} />
                      Empty Cart
                    </button>
                  </div>

                  <div className="divide-y space-y-4 sm:space-y-6 md:space-y-8">
                    {cart.items.map((item) => (
                      <div
                        key={`${item.productId}-${item.variantId}`}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 pt-4 sm:pt-6 md:pt-8 first:pt-0 group"
                      >
                        <div className="w-full sm:w-32 h-40 sm:h-32 bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border transition-transform group-hover:scale-105">
                          <img
                            src={item.product.media.url}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-xl text-gray-900 leading-tight group-hover:text-harvest-green-600 transition-colors">
                                {item.product.name}
                              </h3>
                              <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                                <span className="text-sm">
                                  {item.variant.weight} {item.variant.unit}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.productId, item.variantId)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                              title="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          <div className="flex items-center mt-6">
                            <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white shadow-sm">
                              <button
                                onClick={() =>
                                  decrementQuantity(item.productId, item.variantId, item.quantity)
                                }
                                disabled={item.quantity <= 1}
                                className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:hover:bg-white"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-6 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  incrementQuantity(item.productId, item.variantId, item.quantity)
                                }
                                className="p-3 hover:bg-gray-50 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <OrderSummary items={cart.items} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
