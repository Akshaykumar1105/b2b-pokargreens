import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import type { Product } from "@/types/product";

const FeaturedProducts = () => {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number[]>>({});

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("https://businessapi.pokargreens.com/api/v1/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const json = await response.json();
      return Array.isArray(json.data) ? json.data : [];
    },
  });

  const { addToCart } = useCart();

  const handleVariantSelect = (productId: string, variantId: number, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedVariants((prev) => {
      const currentVariants = prev[productId] || [];
      const isSelected = currentVariants.includes(variantId);
      return {
        ...prev,
        [productId]: isSelected
          ? currentVariants.filter((id) => id !== variantId)
          : [...currentVariants, variantId],
      };
    });
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    const selectedVariantIds = selectedVariants[product.id] || [];
    if (selectedVariantIds.length === 0) {
      toast.error("Please select at least one variant!");
      return;
    }

    const selectedVariantsData = product.variants?.filter((variant) =>
      selectedVariantIds.includes(variant.id)
    );

    if (selectedVariantsData?.length) {
      selectedVariantsData.forEach((variant) => {
        addToCart(product, variant, 1);
        toast.success(`${product.name} (${variant.weight} ${variant.unit}) added to cart!`);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 8);

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
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
            >
              <Link to={`/product/${product.id}`} className="flex flex-col h-full">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={product.media?.url ?? "/default-image.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.variants?.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={(e) => handleVariantSelect(product.id, variant.id, e)}
                        className={`bg-gray-100 text-sm text-center py-1 px-3 rounded-lg shadow-sm transition-colors ${
                          selectedVariants[product.id]?.includes(variant.id)
                            ? "bg-harvest-green-500 text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {variant.weight} {variant.unit}
                      </button>
                    ))}
                  </div>
                  <div className="mt-auto pt-4">
                    <Button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="bg-harvest-green-500 text-white hover:bg-harvest-green-600 w-full"
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
