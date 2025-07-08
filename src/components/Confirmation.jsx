import React from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const { cartItems, checkoutInfo, clearCart, setCheckoutInfo } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    clearCart();
    setCheckoutInfo({ name: "", address: "", payment: "" });
    alert("✅ Order confirmed! Thank you.");
    navigate("/");
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!checkoutInfo.name) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-900">Confirm Your Order</h1>

      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Shipping Details</h2>
        <p><strong>Name:</strong> {checkoutInfo.name}</p>
        <p><strong>Address:</strong> {checkoutInfo.address}</p>
        <p><strong>Payment Method:</strong> {checkoutInfo.payment}</p>
      </div>

      <div className="border p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-2 text-sm">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.title} className="w-10 h-10 object-contain" />
              <span>{item.title} x {item.quantity}</span>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr className="my-2" />
        <div className="text-right font-bold">Total: ${total.toFixed(2)}</div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Confirmation;
