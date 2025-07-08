import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";


export default function Navbar() {
  const { cartItems } = useCart();
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <nav className="bg-white flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
      <Link to="/" className="text-2xl font-bold text-gray-800">Basics</Link>

      <Link to="/cart" className="relative inline-block">
        <span className="text-2xl">🛒</span>
        {count > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </Link>
    </nav>
  );
}

