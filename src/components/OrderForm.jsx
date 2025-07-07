import React from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function OrderForm() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-4 rounded shadow space-y-4 sticky top-20">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Shipping: ${shipping.toFixed(2)}</p>
      <hr />
      <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
