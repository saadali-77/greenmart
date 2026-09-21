import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "./carttype";

interface CartProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
  // Id of the user this cart belongs to, or null for a guest cart.
  owner: string | null;
}

const initialState: CartState = {
  items: [],
  owner: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   addToCart: (
  state,
  action: PayloadAction<{
    product: CartProduct;
    quantity: number;
  }>
) => {
  const { product, quantity } = action.payload;

  console.log("Quantity received:", quantity);

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

  console.log("Cart:", state.items);
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

      if (item && item.quantity < item.stock) {
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

    // Replaces the cart with the one saved on the server for `owner`.
    setCart: (
      state,
      action: PayloadAction<{
        owner: string;
        items: CartItem[];
      }>
    ) => {
      state.owner = action.payload.owner;
      state.items = action.payload.items;
    },

    // Wipes the local copy (logout) without touching the saved cart.
    resetCart: (state) => {
      state.owner = null;
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
  setCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;