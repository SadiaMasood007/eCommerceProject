import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/apiService";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};
