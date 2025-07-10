import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";
import {
  addProductToAPI,
  updateProductInAPI,
  deleteProductFromAPI,
} from "../services/apiService";
import toast from "react-hot-toast";


export function useLocalProducts() {
  const { data: fetched, isLoading, isError } = useProducts();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (fetched) setProducts(fetched);
  }, [fetched]);

  const addProduct = async (product) => {
    try {
      const newProduct = await addProductToAPI(product);
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added to API");
    } catch (err) {
      console.error("Failed to add to API, adding locally", err);
      const fallbackProduct = {
        ...product,
        id: Date.now(),
        rating: { rate: 0, count: 0 },
      };
      setProducts((prev) => [...prev, fallbackProduct]);
      toast.error("Added locally");
    }
  };
  const updateProduct = async (id, updatedData) => {
    try {
      let updatedProduct;
      if (id <= 20) {
        updatedProduct = await updateProductInAPI(id, updatedData);
        toast.success("Product updated on API");
      } else {
        updatedProduct = { ...updatedData, id };
        toast.success("Product updated locally");
      }

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
      );
    } catch (err) {
      console.error("Update failed", err);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
      );
      console.error("API update failed — updated locally", err);
      toast.error("Updated locally");
    }
  };
  const deleteProduct = async (id) => {
    try {
      if (id <= 20) {
        await deleteProductFromAPI(id);
        toast.success("Deleted from API");
      } else {
        toast.success("Deleted locally");
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed (API), but removed locally", err);
      toast.error("Removed locally");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return { addProduct, updateProduct, deleteProduct, products, isLoading, isError };
}
