import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useProduct } from "@/services/products"; // Adjust as needed
import type { Product } from "@/types/product";
import Header from "@/components/Header";

// Define the variant structure based on your data
interface Variant {
  id: number;
  weight: string;
  unit: string;
}

interface ExtendedProduct extends Product {
  variants?: Variant[];
  media?: {
    url: string;
    alt: string;
  };
  category?: {
    name: string;
    media: {
      url: string;
    };
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<number[]>([]);
  const [variantQuantities, setVariantQuantities] = useState<Record<number, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await fetch(`https://businessapi.pokargreens.com/api/v1/products/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const fetchedProduct = await response.json();
          setProduct(fetchedProduct);
        } catch (error) {
          toast.error("Failed to load product");
        }
      }
    };
    fetchProduct();
  }, [id]);

  const toggleVariant = (variantId: number) => {
    setSelectedVariants(prev => {
      if (prev.includes(variantId)) {
        // Remove variant and its quantity
        const newVariants = prev.filter(id => id !== variantId);
        const newQuantities = { ...variantQuantities };
        delete newQuantities[variantId];
        setVariantQuantities(newQuantities);
        return newVariants;
      } else {
        // Add variant with default quantity of 1
        setVariantQuantities(prev => ({ ...prev, [variantId]: 1 }));
        return [...prev, variantId];
      }
    });
  };

  const handleVariantQuantityChange = (variantId: number, change: number) => {
    const currentQty = variantQuantities[variantId] || 1;
    const newQty = currentQty + change;
    if (newQty >= 1 && newQty <= 10) {
      setVariantQuantities(prev => ({ ...prev, [variantId]: newQty }));
    }
  };

  const handleAddToCart = () => {
    if (!product || selectedVariants.length === 0) {
      toast.error("Please select at least one variant");
      return;
    }

    try {
      selectedVariants.forEach(variantId => {
        const variant = product.variants?.find(v => v.id === variantId);
        if (variant) {
          addToCart(product, variant, variantQuantities[variantId] || 1);
          toast.success(`${product.name} (${variant.weight} ${variant.unit}) added to cart!`);
        }
      });
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-harvest-green-600">Home</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-harvest-green-600">Products</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product?.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={product?.media?.url || "/placeholder.jpg"}
                alt={product?.name || "Product Image"}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {product?.category?.name && (
                <span className="absolute top-4 left-4 bg-harvest-green-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                  {product.category.name}
                </span>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{product?.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{product?.description}</p>
              
              {/* Product Badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {product?.organic && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Organic
                  </span>
                )}
                {product?.seasonal && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    Seasonal
                  </span>
                )}
              </div>
            </div>

            {/* Variants Section */}
            {product?.variants && product.variants.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Available Packages</h2>
                  <span className="text-sm text-gray-500">Select size & quantity</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.variants.map((variant) => (
                    <div
                      key={variant.id}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        selectedVariants.includes(variant.id)
                          ? "border-harvest-green-500 bg-harvest-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {variant.weight} {variant.unit}
                          </h3>
                        </div>
                        <Button
                          onClick={() => toggleVariant(variant.id)}
                          variant={selectedVariants.includes(variant.id) ? "default" : "outline"}
                          size="sm"
                          className={selectedVariants.includes(variant.id) ? "bg-harvest-green-500 hover:bg-harvest-green-600" : ""}
                        >
                          {selectedVariants.includes(variant.id) ? "Selected" : "Select"}
                        </Button>
                      </div>

                      {selectedVariants.includes(variant.id) && (
                        <div className="flex items-center justify-between mt-3 bg-white p-2 rounded-lg border border-gray-100">
                          <button
                            onClick={() => handleVariantQuantityChange(variant.id, -1)}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                            disabled={variantQuantities[variant.id] <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-medium text-gray-900">{variantQuantities[variant.id] || 1}</span>
                          <button
                            onClick={() => handleVariantQuantityChange(variant.id, 1)}
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="pt-6">
              <Button
                onClick={handleAddToCart}
                className="w-full py-6 text-lg bg-harvest-green-500 hover:bg-harvest-green-600 text-white rounded-xl transition-transform active:scale-[0.98]"
                disabled={selectedVariants.length === 0}
              >
                {selectedVariants.length === 0 ? "Select a package to continue" : "Add to Cart"}
              </Button>
            </div>

            {/* Product Details */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About this product</h2>
              <div className="prose prose-green max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product?.description || "Fresh from local farms to your table. Handpicked for quality and taste."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
