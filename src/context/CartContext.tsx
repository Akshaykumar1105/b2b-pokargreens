import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product, Variant } from "@/types/product";

interface CartItem {
  productId: string;
  variantId: number;
  quantity: number;
  product: Product;
  variant: Variant;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

const CartContext = createContext<{
  cart: CartState;
  addToCart: (product: Product, variant: Variant, quantity: number) => void;
  removeFromCart: (productId: string, variantId: number) => void;
  updateQuantity: (productId: string, variantId: number, quantity: number) => void;
  clearCart: () => void;
} | undefined>(undefined);

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; variant: Variant; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variantId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variantId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, variant, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id && item.variantId === variant.id
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.productId === product.id && item.variantId === variant.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          { productId: product.id, variantId: variant.id, quantity, product, variant },
        ];
      }

      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case "REMOVE_ITEM": {
      const { productId, variantId } = action.payload;
      const updatedItems = state.items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      );
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case "UPDATE_QUANTITY": {
      const { productId, variantId, quantity } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      );
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case "CLEAR_CART":
      return initialState;

    case "LOAD_CART":
      return action.payload;

    default:
      return state;
  }
};

const calculateCartTotals = (cart: CartState): CartState => {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return { ...cart, totalItems };
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, variant: Variant, quantity: number) => {
    dispatch({ type: "ADD_ITEM", payload: { product, variant, quantity } });
  };

  const removeFromCart = (productId: string, variantId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, variantId } });
  };

  const updateQuantity = (productId: string, variantId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, variantId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
