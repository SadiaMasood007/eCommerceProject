import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

export default function OrderForm() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState(20);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax - discount;

  const applyVoucher = () => {
    if (voucher.trim().toLowerCase() === "save10") {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert("❌ Invalid voucher");
    }
  };

  if (cartItems.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded shadow space-y-4 sticky top-20">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div>
        <label className="font-medium block mb-1">Shipping</label>
        <div className="flex flex-col gap-1 text-sm">
          <label>
            <input
              type="radio"
              value={20}
              checked={shipping === 20}
              onChange={() => setShipping(20)}
              className="mr-2"
            />
            Standard ($20)
          </label>
          <label>
            <input
              type="radio"
              value={40}
              checked={shipping === 40}
              onChange={() => setShipping(40)}
              className="mr-2"
            />
            Fast Shipping ($40)
          </label>
        </div>
      </div>

      <table className="w-full text-sm mt-2">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td className="text-right">${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td className="text-right">${shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax (5%)</td>
            <td className="text-right">${tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Discount</td>
            <td className="text-right text-red-600">-${discount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          placeholder="Voucher"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          className="border p-2 text-sm w-full sm:flex-1"
        />
        <button
          onClick={applyVoucher}
          className="bg-gray-800 text-white px-4 py-2 text-sm rounded hover:bg-gray-900 w-full sm:w-auto"
        >
          Apply
        </button>
      </div>


      <hr className="my-3" />
      <div className="text-right font-bold text-lg">Total: ${total.toFixed(2)}</div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
