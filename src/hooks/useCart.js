import { create } from "zustand";

export const useCart = create((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const existingItem = get().cartItems.find(item => item.id === product.id);
    if (existingItem) {
      set(state => ({
        cartItems: state.cartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }));
    } else {
      set(state => ({
        cartItems: [...state.cartItems, { ...product, quantity: 1 }]
      }));
    }
  },

  removeFromCart: (id) => {
    const currentItem = get().cartItems.find(item => item.id === id);
    if (currentItem?.quantity > 1) {

      set(state => ({
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      }));
    } else {

      set(state => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      }));
    }
  },

  updateQuantity: (id, quantity) => {
    set(state => ({
      cartItems: state.cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));
