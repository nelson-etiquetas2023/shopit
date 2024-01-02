import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productSlice.js';
import usersReducer from './features/user/userSlice.js';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        auth: usersReducer
    }
});

export default store;