export interface Variant {
  id: number;
  variant1: string;
  variant2: string;
  variant3: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice: number | null;
  image: string;
  featured: boolean;
  details: string;
  organic: boolean;
  seasonal: boolean;
  description?: string;
  stock?: number;
  variants?: Variant[];
  defaultVariant?: number;
  selectedVariant?: number; 
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: number;
  selectedSize?: string;
}

export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface PriceRange {
  min: number;
  max: number;
}
