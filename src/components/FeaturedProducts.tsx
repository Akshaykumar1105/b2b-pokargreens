import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import { Heart } from "lucide-react";

const FeaturedProducts = () => {
  const [visible, setVisible] = useState(true);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://businessapi.pokargreens.com/api/v1/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const json = await response.json();
      console.log("Fetched products response:", json);
      return Array.isArray(json.data) ? json.data : []; // ✅ FIX: use json.data
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector("#products");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

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
      <div className="container mx-auto px-4">
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
    );
  }

  const featuredProducts = products.slice(0, 8); // Show first 8

  return (
    <section id="products" className="py-20 bg-harvest-green-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Featured <span className="text-harvest-green-500">Products</span>
            
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our selection of premium fresh produce, picked at peak ripeness and delivered to your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => {
            const imageUrl = product.media?.url ?? ""; // ✅ fallback
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                    <div className="w-full p-3 flex gap-2">
                      <Button
                        className="flex-1 bg-white text-harvest-green-500 hover:bg-harvest-green-500 hover:text-white transition-colors border border-harvest-green-500 font-semibold"
                        onClick={(e) => handleQuickAdd(product, e)}
                      >
                        Quick Add
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="font-regular">{product.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-harvest-green-500 hover:bg-harvest-green-600 text-white font-medium px-6 py-2">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
