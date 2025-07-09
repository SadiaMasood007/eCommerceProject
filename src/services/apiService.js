import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};
export const addProductToAPI = async (product) => {
  const { data } = await axios.post(BASE_URL, product);
  return data;
};


export const updateProductInAPI = async (id, product) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, product);
  return data;
};

export const deleteProductFromAPI = async (id) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`);
  return data;
};