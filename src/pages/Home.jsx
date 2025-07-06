import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  console.log("Home.jsx rendered");
  return (
    <div>
      <h1 className="text-2xl font-bold p-4 mx-4">All Products</h1>
      <ProductList />
    </div>
  );
};

export default Home;
