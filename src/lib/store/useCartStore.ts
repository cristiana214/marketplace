import { create } from "zustand";
import type { Product } from "@/types/data";

type CartItem = {
  productId: number;
  quantity: number;
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
   * function to add a product to the cart, each product object will be added to products array for cart total display iteration
   */
  addToCart: (productId: number, product: Product) => void;
  /**
   * function to remove a product from the cart.
   */
  removeFromCart: (productId: number) => void;
  /**
   *
   * function to calculate and return the total price of the items in the cart
   */
  cartTotal: () => number;
  setProducts: (products: Product[]) => void; // New setter to update products
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  products: [], // you would typically fetch and populate this elsewhere

  addToCart: (productId: number, product: Product) => {
    set((state) => {
      // checks if the product is already in the cart by using find to search through the cart.
      const existingItem = state.cart.find(
        (item) => item.productId === productId,
      );

      // if the product is found, the quantity of that product is increased by 1.
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
        // if the product is not already in the cart, it's added with an initial quantity of 1
        cart: [...state.cart, { productId, quantity: 1 }],
        // also add product object to products this will be used in cart total display later
        products: state.products
          ? [...state.products, product].filter(
              (p, index, self) =>
                index === self.findIndex((x) => x.productId === p.productId),
            ) // prevent duplicates in the products array
          : [product],
      };
    });
  },

  removeFromCart: (productId: number) => {
    set((state) => {
      // it checks if the product exists in the cart.
      const existingItem = state.cart.find(
        (item) => item.productId === productId,
      );
      // if it exists and the quantity is greater than 1, the quantity is decreased by 1.
      if (existingItem && existingItem.quantity > 1) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        };
      }
      // if the quantity is 1 or the product doesn’t exist in the cart, the product is removed from the cart entirely.
      return {
        cart: state.cart.filter((item) => item.productId !== productId),
      };
    });
  },

  // pass products array as an argument
  cartTotal: () =>
    get().cart.reduce((total, item) => {
      const product = get().products?.find(
        (p) => p.productId === item.productId,
      );
      return total + (product ? product.price * item.quantity : 0);
    }, 0),
  // setter to update the products array
  setProducts: (products: Product[]) => {
    set({ products });
  },
}));
