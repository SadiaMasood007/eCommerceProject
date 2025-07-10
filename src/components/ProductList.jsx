import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { useLocalProducts } from "../hooks/useLocalProducts";
import ProductModal from "./ProductModal";


export default function ProductList() {
  const { addToCart } = useCart();
  const { products, isLoading, isError, addProduct, updateProduct, deleteProduct } = useLocalProducts();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState("add");
  const [editData, setEditData] = React.useState(null);
  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading products</p>;

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
  };

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

  const scrollToCategory = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  const openAddModal = () => {
    setModalMode("add");
    setEditData(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode("edit");
    setEditData(product);
    setModalOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">

      <div className="mb-10">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-900">Explore</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className="px-4 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-900 rounded border border-blue-200 transition"
            >
              {categoryTitles[cat]}
            </button>
          ))}
        </div>
      </div>


      <div className="max-w-5xl mx-auto p-6 space-y-14">
        {Object.keys(categories).map((cat) =>
          categories[cat].length > 0 ? (
            <div key={cat} id={cat}>
              <h2 className="text-xl font-bold text-center text-blue-900 mb-6">
                {categoryTitles[cat]}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center items-stretch auto-rows-[1fr]">
                {categories[cat].map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform 
                               w-full max-w-[220px] h-[370px] flex flex-col justify-between mx-auto"
                  >
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex flex-col gap-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProduct(product.id);
                          toast.success("Deleted")
                        }}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                    <Link to={`/products/${product.id}`} className="flex-1 w-full">
                      <div className="flex flex-col items-start h-full">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-32 w-full object-contain mx-auto"
                        />
                        <h3 className="mt-2 text-sm font-semibold line-clamp-2-local text-left w-full">
                          {product.title}
                        </h3>
                        <p className="text-gray-700 font-medium mt-1 text-left w-full">
                          ${product.price}
                        </p>
                        <p className="text-blue-600 text-sm text-left w-full">
                          {renderStars(product.rating?.rate)}{" "}
                          <span className="text-gray-500 text-xs">({product.rating?.count})</span>
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        addToCart(product);
                        toast.success("Added to cart!");
                      }}
                      className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-black px-2 py-1 text-sm rounded shadow-sm"
                    >
                      + 🛒
                    </button>


                  </div>
                ))}

                <div
                  onClick={openAddModal}
                  className="group relative bg-white p-4 rounded-lg shadow hover:scale-105 transition-transform 
             w-full max-w-[220px] h-[330px] flex flex-col justify-center items-center mx-auto cursor-pointer 
             border-2 border-dashed border-gray-300"
                >
                  <span className="text-4xl">+</span>

                </div>

              </div>
            </div>

          ) : null
        )}
      </div>
      <ProductModal
        isOpen={modalOpen}
        mode={modalMode}
        initial={editData}
        onClose={() => setModalOpen(false)}
        onSave={(product) => {
          if (modalMode === "add") {
            addProduct(product);
            toast.success("Product Added");
          } else {
            updateProduct(product.id, product);
            toast.success("Product Updated");
          }
        }}
      />

    </div>

  );
}

