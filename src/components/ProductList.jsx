import React from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";

export default function ProductList() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading products</p>;

  const categories = {
    "men's clothing": [],
    "women's clothing": [],
    "jewelery": [],
    "electronics": [],
  };

  products.forEach((product) => {
    if (categories[product.category]) {
      categories[product.category].push(product);
    }
  });

  const categoryTitles = {
    "men's clothing": "Men's Clothing and Bags",
    "women's clothing": "Women's Clothing",
    "jewelery": "Accessories & Jewelry",
    "electronics": "Electronics",
  };

  return (
    <div className="space-y-8 mx-7">
      {Object.keys(categories).map((cat) =>
        categories[cat].length > 0 ? (
          <div key={cat}>
            <h2 className="text-xl font-bold mb-4">{categoryTitles[cat]}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories[cat].map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <div className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-32 w-full object-contain mx-auto"
                    />
                    <h3 className="mt-2 text-sm font-semibold">{product.title}</h3>
                    <p className="text-gray-700 font-medium">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
