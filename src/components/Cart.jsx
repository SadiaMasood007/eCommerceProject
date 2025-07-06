import React from "react";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

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
                  <div className="mt-1">
                    <label className="mr-2">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 border px-2"
                    />
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

          <div className="text-right mt-6">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="mt-2 bg-gray-100 text-gray-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
