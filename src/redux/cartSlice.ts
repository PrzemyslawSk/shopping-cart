import { createSlice } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  quantity: number;
};

export interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  isCartOpen: boolean;
}

const updateStorageCartItems = (cartItems: CartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const items = localStorage.getItem("cartItems");
const parsedItems = items ? (JSON.parse(items) as CartItem[]) : null;
const initialState: CartState = {
  cartItems: parsedItems ? parsedItems : [],
  cartTotalQuantity: parsedItems
    ? parsedItems.reduce(
        (quantity: number, item: CartItem) => item.quantity + quantity,
        0
      )
    : 0,
  isCartOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItems.push({ id: action.payload.id, quantity: 1 });
      }
      updateStorageCartItems(state.cartItems);
    },
    updateAmountOfItems: (state) => {
      state.cartTotalQuantity = state.cartItems.reduce(
        (quantity: number, item: CartItem) => item.quantity + quantity,
        0
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      item && item.quantity++;
      updateStorageCartItems(state.cartItems);
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (item) {
        if (item?.quantity === 1) {
          const removeItem = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
          state.cartItems = removeItem;
        } else {
          item.quantity--;
        }
      }
      updateStorageCartItems(state.cartItems);
    },
    removeItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removeItem;
      updateStorageCartItems(state.cartItems);
    },
    openCloseCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  updateAmountOfItems,
  openCloseCart,
} = cartSlice.actions;

export default cartSlice.reducer;
