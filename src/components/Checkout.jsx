import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Checkout = () => {
  const { cartItems, setCheckoutInfo } = useCart();
  const [form, setForm] = useState({ name: "", address: "", payment: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.payment) {
      alert("Please fill all the fields");
      return;
    }

    setCheckoutInfo(form);
    navigate("/confirmation");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 border p-4 rounded shadow-md h-fit">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2 text-sm">
            <span>{item.title}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
      </div>

      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Shipping Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border p-2"
              required
            >
              <option value="">Select</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="online">Online Banking</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Confirm & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
