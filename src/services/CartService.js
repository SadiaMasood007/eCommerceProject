import { useCart } from "../hooks/useCart";


export const addProductToCart = (product) => {
  useCart.getState().addToCart(product);
};

export const removeProductFromCart = (id) => {
  useCart.getState().removeFromCart(id);
};

export const updateProductQuantity = (id, quantity) => {
  useCart.getState().updateQuantity(id, quantity);
};

export const clearCartItems = () => {
  useCart.getState().clearCart();
};

export const getCartItems = () => {
  return useCart.getState().cartItems;
};

export const getCartTotal = () => {
  const items = useCart.getState().cartItems;
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};
export const cartCount = () => {
  const items = useCart.getState().cartItems;
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

