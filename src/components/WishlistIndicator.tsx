import React from "react";
import { Link } from "react-router-dom";

const WishlistIndicator = () => {
  // For now, we'll just have a static indicator with a count of 0
  // This could be enhanced with a WishlistContext in the future
  const wishlistCount = 0;

  return (
    <Link to="/wishlist" className="relative p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {wishlistCount > 0 && (
        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistIndicator;