import React from "react";
import { Link } from "react-router-dom";
import { cartCount } from "../services/CartService";

export default function Navbar() {
  const count = cartCount();
  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold p-1">Basics</Link>
      <Link to="/cart" className="text-xl">
        🛒
        {count > 0 && <span>{count}</span>}
      </Link>
    </nav>
  );
}
