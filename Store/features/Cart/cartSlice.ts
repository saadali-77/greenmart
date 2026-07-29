import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./carttype";
import { Product } from "@/types/product";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
      }>
    ) => {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<string>
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<string>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;