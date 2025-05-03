import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Share, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProduct } from "@/services/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types/product";
import Header from "@/components/Header";

// Define the variant structure based on your data
interface Variant {
  id: number;
  variant1: string;
  variant2: string;
  variant3: string;
  price: number;
}

interface ExtendedProduct extends Product {
  variants?: Variant[];
  defaultVariant?: number;
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await getProduct(Number(id));
          setProduct(fetchedProduct);
          
          // Set default variant when product loads
          if (fetchedProduct?.defaultVariant) {
            setSelectedVariant(fetchedProduct.defaultVariant);
          } else if (fetchedProduct?.variants?.length > 0) {
            setSelectedVariant(fetchedProduct.variants[0].id);
          }
          
          // Set default option
          setSelectedOption("variant1");
        } catch (error) {
          toast.error("Failed to load product");
        }
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const getCurrentVariant = () => {
    if (!product?.variants || !selectedVariant) return null;
    return product.variants.find(v => v.id === selectedVariant);
  };

  const getCurrentPrice = () => {
    const variant = getCurrentVariant();
    return variant?.price || product?.price || 0;
  };

  const getCurrentSize = () => {
    const variant = getCurrentVariant();
    if (!variant || !selectedOption) return "";
    
    return variant[selectedOption as keyof typeof variant] as string;
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant || !selectedOption) {
      toast.error("Please select a variant and size");
      return;
    }

    try {
      const variant = getCurrentVariant();
      const size = getCurrentSize();
      
      // Add the product to cart with variant information
      addToCart({
        ...product,
        selectedVariantId: selectedVariant,
        selectedSize: size,
        price: getCurrentPrice()
      }, quantity);
      
      toast.success("Added to cart!");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const toggleWishlist = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product?.name,
        text: `Check out ${product?.name} on Pokar Greens!`,
        url: window.location.href,
      });
    } catch (error) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard");
      } catch (clipboardError) {
        toast.error("Sharing failed");
      }
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            {product.organic && (
              <span className="absolute top-4 left-4 bg-harvest-accent text-white text-xs font-bold px-2 py-1 rounded-md">
                Organic
              </span>
            )}
            {product.seasonal && (
              <span className="absolute top-4 left-20 bg-harvest-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                Seasonal
              </span>
            )}
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-500">{product.details}</p>
            
            {/* Price display */}
            {/* <div className="text-2xl font-bold text-harvest-green-500">
              ${getCurrentPrice().toFixed(2)}
            </div> */}
            
            {/* Variant Selection (Package) */}
            {/* {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Select Package</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant.id)}
                      className={`px-4 py-2 border rounded-lg transition ${
                        selectedVariant === variant.id 
                          ? 'border-harvest-green-500 bg-harvest-green-50 text-harvest-green-700' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      Package {variant.id}
                    </button>
                  ))}
                </div>
              </div>
            )} */}
            
            {/* Size options */}
            {product.variants && selectedVariant && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Select Variant</h2>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedOption("variant1")}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedOption === "variant1" 
                        ? 'border-harvest-green-500 bg-harvest-green-50 text-harvest-green-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {getCurrentVariant()?.variant1}
                  </button>
                  <button
                    onClick={() => setSelectedOption("variant2")}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedOption === "variant2" 
                        ? 'border-harvest-green-500 bg-harvest-green-50 text-harvest-green-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {getCurrentVariant()?.variant2}
                  </button>
                  <button
                    onClick={() => setSelectedOption("variant3")}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedOption === "variant3" 
                        ? 'border-harvest-green-500 bg-harvest-green-50 text-harvest-green-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {getCurrentVariant()?.variant3}
                  </button>
                </div>
              </div>
            )}
            
            {/* Selected size display */}
            {selectedVariant && selectedOption && (
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">Selected size: <span className="font-semibold">{getCurrentSize()}</span></p>
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-full">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:text-harvest-green-500"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:text-harvest-green-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={toggleWishlist}
                variant="outline"
                size="icon"
                className={`rounded-full ${isInWishlist(product.id) ? 'text-red-500' : ''}`}
              >
                <Heart className="h-4 w-4" fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </Button>
              
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-harvest-green-500 hover:bg-harvest-green-600 text-white"
              disabled={!selectedVariant || !selectedOption}
            >
              Add to Cart 
              {/* ${getCurrentPrice().toFixed(2)} */}
            </Button>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">About this product</h2>
              <p className="text-gray-600">
                {product.description ||
                  "Fresh from local farms to your table. Handpicked for quality and taste."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;