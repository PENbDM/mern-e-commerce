import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProducts: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProducts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    updateTotalQuantity: (state) => {
      state.quantity = state.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
    },
    addProductsCart: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.cartItemId === action.payload.cartItemId
      );

      if (productIndex !== -1) {
        // Если продукт найден, обновляем его количество
        state.products[productIndex].quantity += 1;
        state.quantity += 1;
        state.total += action.payload.price;
      }
    },
    removeProdFromCart: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (productIndex !== -1 && state.products[productIndex].quantity > 0) {
        // If the product is found and its quantity is greater than 0, update its quantity
        state.products[productIndex].quantity -= 1;
        state.quantity -= 1;
        state.total -= action.payload.price;

        // If quantity becomes 0, remove the product from the cart
        if (state.products[productIndex].quantity === 0) {
          state.products.splice(productIndex, 1);
        }
      }
    },
  },
});

export const {
  addProducts,
  addProductsCart,
  removeProducts,
  removeProdFromCart,
  updateTotalQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
