import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import ProductModal from "./ProductModal";
import { useLocalProducts } from "../hooks/useLocalProducts";

export default function ProductsDetail() {
  const { id } = useParams();
  const { products, isLoading, isError, addProduct, updateProduct, deleteProduct } = useLocalProducts();
  const product = products?.find((p) => p.id === Number(id));

  const allProducts = products;

  const { addToCart } = useCart();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalMode, setModalMode] = React.useState("add");
  const [editData, setEditData] = React.useState(null);

  if (isLoading) return <p className="text-center">Loading product...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load product</p>;
  if (!product) return <p className="text-center text-gray-500">Product not found</p>;

  const related = allProducts
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id)
    : [];

  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
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
    <div className="max-w-5xl mx-auto p-6 space-y-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

        <div className="relative group">
          <img
            src={product.image}
            alt={product.title}
            className="h-64 object-contain mx-auto"
          />

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
            <button
              onClick={() => openEditModal(product)}
              className="text-xs text-blue-600 hover:underline bg-white px-2 py-1 "
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteProduct(product.id);
                toast.success("Deleted");
              }}
              className="text-xs text-red-600 hover:underline bg-white px-2 py-1 "
            >
              Delete
            </button>
          </div>
        </div>
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
              addToCart(product);
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
              <div key={item.id} className=" group relative bg-white p-4 rounded shadow hover:scale-105 transition-transform flex flex-col justify-between h-[330px]">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 flex flex-col gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteProduct(item.id);
                      toast.success("Deleted")
                    }}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
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
                    addToCart(item);
                    toast.success("Added to cart!");
                  }}
                  className="mt-2 bg-gray-100 hover:bg-gray-200 text-black px-2 py-1 text-sm rounded shadow-sm"
                >
                  + 🛒
                </button>
              </div>
            ))}
            <div
              onClick={openAddModal}
              className="cursor-pointer flex flex-col justify-center items-center text-gray-500 border-2 border-dashed border-gray-300 
             rounded-lg hover:bg-gray-100 transition w-full max-w-[220px] h-[370px] mx-auto"
            >
              <span className="text-4xl">+</span>

            </div>
          </div>
        </div>
      )}
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