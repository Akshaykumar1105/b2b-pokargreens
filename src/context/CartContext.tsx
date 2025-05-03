import { createContext, useContext, useReducer, useEffect } from "react";
import { CartContextType, CartState, CartItem } from "@/types/cart";
import { Product } from "@/types/product";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: number }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: number; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.product.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.productId === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return calculateCartTotals({ ...state, items: updatedItems });
      }

      const newItem: CartItem = {
        productId: action.payload.product.id,
        quantity: action.payload.quantity,
        product: action.payload.product,
      };
      return calculateCartTotals({
        ...state,
        items: [...state.items, newItem],
      });
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(
        (item) => item.productId !== action.payload
      );
      return calculateCartTotals({ ...state, items: updatedItems });
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
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
  const totalPrice = cart.items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return { ...cart, totalItems, totalPrice };
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
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

  const addToCart = (product: Product, quantity: number) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
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
