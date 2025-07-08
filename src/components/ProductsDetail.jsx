import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/apiService";
import { useProducts } from "../hooks/useProducts";
import { addProductToCart } from "../services/CartService";
import toast from "react-hot-toast";

export default function ProductsDetail() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const { data: allProducts } = useProducts();

  if (isLoading) return <p className="text-center">Loading product...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load product</p>;

  const related = allProducts
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id)
    : [];

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <img src={product.image} alt={product.title} className="h-64 object-contain mx-auto" />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-lg text-gray-700 mt-4">${product.price}</p>
          <p className="text-blue-600 text-sm">
            {renderStars(product.rating.rate)}{" "}
            <span className="text-gray-500 text-xs">({product.rating.count})</span>
          </p>
          <button
            onClick={() => {
              addProductToCart(product);
              toast.success("Added to cart!");
            }}
            className="mt-6 hover:bg-gray-200 bg-gray-100 text-black px-3 py-1 rounded shadow-md inset-shadow-sm"
          >
            + 🛒
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-900">You also might like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(item => (
              <div key={item.id} className="bg-white p-4 rounded shadow hover:scale-105 transition-transform flex flex-col justify-between h-[330px]">
                <Link to={`/products/${item.id}`}>
                  <img src={item.image} alt={item.title} className="h-32 object-contain mx-auto" />
                  <h3 className="mt-2 text-sm font-semibold line-clamp-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm">${item.price}</p>
                  <p className="text-blue-600 text-xs">
                    {renderStars(item.rating.rate)}{" "}
                    <span className="text-gray-500 text-xs">({item.rating.count})</span>
                  </p>
                </Link>
                <button
                  onClick={() => {
                    addProductToCart(item);
                    toast.success("Added to cart!");
                  }}
                  className="mt-2 bg-gray-100 hover:bg-gray-200 text-black px-2 py-1 text-sm rounded shadow-sm"
                >
                  + 🛒
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
