import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Checkout = () => {
  const { cartItems, setCheckoutInfo } = useCart();
  const [form, setForm] = useState({ name: "", address: "", payment: "", easypaisa: "", cardNumber: "", cvv: "", expiry: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, payment, easypaisa, cardNumber, cvv, expiry } = form;

    if (!name || !address || !payment) {
      alert("Please fill all the fields");
      return;
    }

    if (payment === "online" && !easypaisa) {
      alert("Please enter your Easypaisa account number");
      return;
    }

    if (payment === "card" && (!cardNumber || !cvv || !expiry)) {
      alert("Please enter all card details");
      return;
    }

    setCheckoutInfo(form);
    navigate("/confirmation");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/* Order Summary */}
      <div className="md:col-span-1 border p-4 rounded shadow-md h-fit bg-white">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-3 gap-3">
            <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
            <div className="flex-1 text-sm">
              <p className="line-clamp-1">{item.title}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-2" />
        <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
      </div>

      {/* Checkout Form */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold text-blue-900">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Shipping Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="online">Online Banking (Easypaisa)</option>
            </select>
          </div>

          {form.payment === "online" && (
            <div>
              <label className="block mb-1">Easypaisa Account Number</label>
              <input
                name="easypaisa"
                value={form.easypaisa}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          )}

          {form.payment === "card" && (
            <>
              <div>
                <label className="block mb-1">Card Number</label>
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">CVV</label>
                  <input
                    name="cvv"
                    value={form.cvv}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Expiry Date</label>
                  <input
                    name="expiry"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Confirm & Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
