import React from "react";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { addProductToCart } from "../services/CartService";

export const generateStars = () => {
  const stars = Math.floor(Math.random() * 3) + 3;
  return "★".repeat(stars) + "☆".repeat(5 - stars);
};

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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories[cat].map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform h-[360px] flex flex-col justify-between"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-32 w-32 object-contain"
                      />
                      <h3 className="mt-2 text-sm font-semibold text-center line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-700 font-medium mt-1">${product.price}</p>
                      <p className="text-yellow-500 text-sm">{generateStars()}</p>
                    </div>
                  </Link>
                  <div className="flex justify-end mt-2">
                    <button onClick={() => addProductToCart(product)} className="bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 text-sm rounded shadow-sm">
                      + 🛒
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
