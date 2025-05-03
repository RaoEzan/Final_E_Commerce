import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      if (existingIndex === -1) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      } else {
        state.cartItems[existingIndex].quantity += 1;
      }
    },
    increaseQuantity: (state, action) => {
        const item = state.cartItems.find(p => p.id === action.payload);
        if (item) {
          item.quantity += 1;
        }
    },
    decreaseQuantity: (state, action) => {
        const item = state.cartItems.find(p => p.id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
      },
      deleteItem: (state, action) => {
        state.cartItems.splice(action.payload, 1);
      },
      removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      },
    },
  });
  
  export const { addToCart, increaseQuantity, decreaseQuantity, deleteItem ,removeFromCart } = cartSlice.actions;
  export default cartSlice.reducer;