import { Product, ProductFilters, PriceRange } from "@/types/product";

// This would be replaced with actual API integration later
export const getProduct = async (id: number): Promise<Product | null> => {
  const products = await getProducts();
  return products.find(product => product.id === id) || null;
};

export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  // This would be replaced with actual API fetch
  let products = [
    {
      id: 1,
      name: "Organic Strawberries",
      category: "fruits",
      price: 4.99,
      discountPrice: 3.99,
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: true,
      seasonal: true,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 2,
      name: "Fresh Broccoli",
      category: "vegetables",
      price: 2.49,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1305&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: true,
      seasonal: false,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 3,
      name: "Red Apples",
      category: "fruits",
      price: 3.29,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: false,
      seasonal: true,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 4,
      name: "Organic Bell Peppers",
      category: "vegetables",
      price: 3.99,
      discountPrice: 2.99,
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: true,
      seasonal: false,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 5,
      name: "Fresh Avocados",
      category: "fruits",
      price: 5.99,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: false,
      seasonal: true,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 6,
      name: "Organic Carrots",
      category: "vegetables",
      price: 1.99,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1599&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: true,
      seasonal: false,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 7,
      name: "Bananas",
      category: "fruits",
      price: 1.49,
      discountPrice: null,
      image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: false,
      seasonal: false,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    },
    {
      id: 8,
      name: "Organic Kale",
      category: "vegetables",
      price: 2.79,
      discountPrice: 2.29,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1305&q=80",
      featured: true,
      details: "This is organic item, You can purchase from this site",
      organic: true,
      seasonal: true,
      variants: [
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
        { id: 1, variant1: "1KG", variant2: '2KG', variant3: "3KG" },
        { id: 1, variant1: "2KG", variant2: '500gm', variant3: "1KG" },
      ],
    }
  ];

  if (filters) {
    if (filters.category) {
      products = products.filter(product => {
        if (filters.category === 'organic') return product.organic;
        if (filters.category === 'seasonal') return product.seasonal;
        return product.category === filters.category;
      });
    }

    if (filters.priceRange) {
      products = products.filter(
        product => {
          const price = product.discountPrice || product.price;
          return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
        }
      );
    }
  }

  return products;
};

export const getPriceRange = async (): Promise<PriceRange> => {
  const products = await getProducts();
  const prices = products.map(p => p.discountPrice || p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};
