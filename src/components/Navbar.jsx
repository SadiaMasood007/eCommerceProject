import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold p-1">Basics</Link>
      <Link to="/CartPage" className="text-xl">
        🛒
      </Link>
    </nav>
  );
}
