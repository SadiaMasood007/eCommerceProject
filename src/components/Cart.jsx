import React from "react";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantity = (id, current, change) => {
    const newQty = current + change;
    if (newQty >= 1) updateQuantity(id, newQty);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-4">
                <img src={item.image} className="h-16 w-16 object-contain" alt={item.title} />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="mt-1 flex items-center gap-2">
                    {/* <label>Qty:</label> */}
                    <button
                      onClick={() => handleQuantity(item.id, item.quantity, -1)}
                      className="border px-2 bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item.id, item.quantity, 1)}
                      className="border px-2 bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
