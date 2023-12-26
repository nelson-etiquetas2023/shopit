import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productSlice.js';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    }
});

export default store;