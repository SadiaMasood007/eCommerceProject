import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";
const BASE_URL_CRUD = "https://fakestoreapi.com/products"

export const fetchProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};
export const addProductToAPI = async (product) => {
  const { data } = await axios.post(BASE_URL_CRUD, product);
  return data;
};


export const updateProductInAPI = async (id, product) => {
  const { data } = await axios.put(`${BASE_URL_CRUD}/${id}`, product);
  return data;
};

export const deleteProductFromAPI = async (id) => {
  const { data } = await axios.delete(`${BASE_URL_CRUD}/${id}`);
  return data;
};