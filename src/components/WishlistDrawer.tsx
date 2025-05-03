import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Heart, X, Trash } from "lucide-react";
import { toast } from "sonner";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistDrawer = ({ isOpen, onClose }: WishlistDrawerProps) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleMoveToCart = (productId: string) => {
    toast.success("Move to cart functionality coming soon!");
    // Here you might want to actually call a moveToCart function if you have it
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center">
              <Heart className="mr-2" size={20} />
              Your Wishlist
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {wishlist.items.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-500">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <div className="flex items-baseline mt-1">
                        <span className="font-semibold text-harvest-green-600">
                          $
                          {(
                            item.product.discountPrice || item.product.price
                          ).toFixed(2)}
                        </span>
                        {item.product.discountPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${item.product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <Button
                          variant="outline"
                          className="text-harvest-green-600 hover:bg-harvest-green-100 text-xs px-3 py-1"
                          onClick={() => handleMoveToCart(item.productId)}
                        >
                          Move to Cart
                        </Button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromWishlist(item.productId)}
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

          {wishlist.items.length > 0 && (
            <div className="p-4 border-t bg-gray-50">
              <Button
                variant="outline"
                className="w-full text-gray-600"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
