import React from "react";
import Cart from "../components/Cart";
import OrderForm from "../components/OrderForm";

const CartPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Cart />
      </div>
      <div className="md:col-span-1">
        <OrderForm />
      </div>
    </div>
  );
};

export default CartPage;
