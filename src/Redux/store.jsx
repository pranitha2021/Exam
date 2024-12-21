import { configureStore } from '@reduxjs/toolkit';
import productSlice from "./productSlice"

const Store = configureStore({
  reducer: {
    products: productSlice
  },
});

export default Store
