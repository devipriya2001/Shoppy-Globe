import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => action.payload, 

    addToCartLocal: (state, action) => {
      const existingItem = state.find((item) => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },

    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.find((item) => item._id === productId);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

// Export reducers
export const { addToCartLocal, removeFromCart, setCart, updateCartQuantity } = cartSlice.actions;

// Async action to add an item to the cart in the backend
export const addToCart = (item) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/cart', {
      userId: 'user123', 
      productId: item._id,
      title: item.title,
      price: item.price,
      quantity: 1,
    });
    dispatch(addToCartLocal(response.data)); 
  } catch (error) {
    console.error('Failed to add item to cart:', error);
  }
};

export default cartSlice.reducer;
