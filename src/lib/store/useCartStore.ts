import { create } from "zustand";
import type { Product } from "@/types/data";

type CartItem = {
  productId: number;
  quantity: number;
  currentPrice: number; // added to track the price when the item is added to the cart
  name?: string; // added name infor to display in summary
};

type CartState = {
  /**
   * cart items added to the cart
   */
  cart: CartItem[];
  /**
   * products array of Product objects, representing the available products in the store
   */
  products?: Product[];
  /**
   * function to add a product to the cart
   */
  addToCart: (productId: number, product?: Product) => void;
  /**
   * function to remove a product from the cart
   */
  removeFromCart: (productId: number) => void;
  /**
   * function to calculate and return the total price of the items in the cart
   */
  cartTotal: () => number;
  setProducts: (products: Product[]) => void; // Setter to update products
  /**
   * function to clear the cart
   */

  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  products: [],

  addToCart: (productId: number, product?: Product) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === productId,
      );

      // If the product is already in the cart, increase the quantity
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      // Add product to cart with current price
      if (product) {
        return {
          cart: [
            ...state.cart,
            {
              productId: product.productId,
              quantity: 1,
              currentPrice: product.price,
              name: product.name,
            },
          ],
          products: state.products
            ? [...state.products, product].filter(
                (p, index, self) =>
                  index === self.findIndex((x) => x.productId === p.productId),
              )
            : [product],
        };
      }

      // If no product data is provided, return the state unchanged
      return state;
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
    get().cart.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0,
    ),

  setProducts: (products: Product[]) => {
    set({ products });
  },
  clearCart: () => {
    set({ cart: [] });
  },
}));
