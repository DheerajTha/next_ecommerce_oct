import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const Cart = ({ count = 0, onClick, size = 20 }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Shopping cart"
      className="relative text-gray-600 hover:text-blue-600 transition"
    >
      <FiShoppingCart size={size} />

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};

export default Cart;
