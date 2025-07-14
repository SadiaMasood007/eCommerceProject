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

    const newProduct = await addProductToAPI(product);
    setProducts((prev) => [...prev, newProduct]);
    toast.success("Product added to API");

  };
  const updateProduct = async (id, updatedData) => {
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
  };



  const deleteProduct = async (id) => {

    if (id <= 20) {
      await deleteProductFromAPI(id);
      toast.success("Deleted from API");
    } else {
      toast.success("Deleted locally");
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));

  };

  return { addProduct, updateProduct, deleteProduct, products, isLoading, isError };
}
