export const selectCartItems = (state) => state.cart;
export const selectCartTotal = (state) =>
    state.cart.reduce((total, item) => total + item.price, 0);