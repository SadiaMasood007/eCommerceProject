import React from "react";
import ProductsDetail from "../components/ProductsDetail";

const ProductsDetailPage = () => {
  console.log("ProductsDetailPage.jsx rendered");
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Products Detail</h1>
      <ProductsDetail />
    </div>
  );
};

export default ProductsDetailPage;
