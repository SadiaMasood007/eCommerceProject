import React from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) return <p className="text-center text-lg mt-4">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-4">Error loading products</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {data.map((product) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          className="border rounded-lg shadow hover:shadow-md transition duration-200 p-4 bg-white"
        >
          <div className="flex flex-col items-center space-y-2">
            <img
              src={product.image}
              alt={product.title}
              className="h-32 w-32 object-contain"
            />
            <h3 className="text-sm font-semibold text-center">{product.title}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
