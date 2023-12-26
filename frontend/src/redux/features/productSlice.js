import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: null,
    error: null
};


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProductsRequest: (state, action) => {
            state.loading = false;
        },
        loadProductsSuccess: (state, action) => {
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            }
        },
        loadProductsError: (state,action) => {
            return {
                loading: false,
                error: action.payload
            }
        },
        clearErrors: (state,action) => {
            state.error = null
        }, 
        newProduct: (state, action) => {},
        getAllProducts: (state,action) => {},
        getProductId: (state, action) => {},
        deleteProductId: (state, action) => {},
        updateProductId: (state, action) => {}
    }   


});

export const {
    loadProductsRequest,
    loadProductsSuccess,
    loadProductsError,
    clearErrors
} = productsSlice.actions;

export default productsSlice.reducer;
 
