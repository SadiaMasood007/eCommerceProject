import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/apiService";
import { generateStars } from "./ProductList";
import { addProductToCart } from "../services/CartService";
import toast from "react-hot-toast";

export default function ProductsDetail() {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <p className="text-center">Loading product...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load product</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.image} alt={product.title} className="h-64 object-contain mx-auto" />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-lg text-gray-700  mt-4">${product.price}</p>
        <p className="text-yellow-500 text-sm">{generateStars()}</p>
        <button onClick={() => {
          addProductToCart(product);
          toast.success("Added to cart!");
        }} className="mt-6 hover:bg-gray-200 bg-gray-100 text-black px-3 py-1 rounded shadow-md inset-shadow-sm">+🛒</button>
      </div>
    </div>
  );
}
