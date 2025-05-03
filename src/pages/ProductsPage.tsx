import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import Header from "@/components/Header";

const ProductsPage = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({}),
  });

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist`);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header></Header>
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header></Header>
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.organic && (
                      <span className="bg-harvest-accent text-white text-xs font-bold px-2 py-1 rounded-md">
                        Organic
                      </span>
                    )}
                    {product.seasonal && (
                      <span className="bg-harvest-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        Seasonal
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                    <div className="w-full p-3 flex gap-2">
                      <Button
                        className="flex-1 bg-white text-harvest-green-500 hover:bg-harvest-green-500 hover:text-white transition-colors border border-harvest-green-500 font-semibold"
                        onClick={(e) => handleQuickAdd(product, e)}
                      >
                        Quick Add
                      </Button>
                      {/* <Button
                        variant="outline"
                        size="icon"
                        className={`rounded-full bg-white ${
                          isInWishlist(product.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={(e) => handleWishlist(product, e)}
                      >
                        <Heart
                          className="h-4 w-4"
                          fill={
                            isInWishlist(product.id) ? "currentColor" : "none"
                          }
                        />
                      </Button> */}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline">
                      {product.discountPrice ? (
                        <>
                          <span className="font-bold text-lg text-harvest-green-500">
                            ${product.discountPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-lg text-harvest-green-500">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
