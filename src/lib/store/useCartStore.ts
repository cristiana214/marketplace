import { create } from "zustand";
import type { Product } from "@/types/data";

interface CartItem {
  productId: number;
  quantity: number;
}
interface CartState {
  cart: CartItem[];
  products: Product[]; // Products should be available in the store
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  cartTotal: () => number; // Function that returns the total
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  products: [], // you would typically fetch and populate this elsewhere

  addToCart: (productId: number) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === productId,
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        cart: [...state.cart, { productId, quantity: 1 }],
      };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === productId,
      );
      if (existingItem && existingItem.quantity > 1) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };
      }
      return {
        cart: state.cart.filter((item) => item.productId !== productId),
      };
    });
  },

  cartTotal: () =>
    get().cart.reduce((total, item) => {
      const product = get().products.find(
        (p) => p.productId === item.productId,
      );
      return total + (product ? product.price * item.quantity : 0);
    }, 0),
}));
