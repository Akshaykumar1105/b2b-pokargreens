
import { Product } from './product';

export interface WishlistState {
  items: Product[];
}

export interface WishlistContextType {
  wishlist: WishlistState;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}
