import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    loading: null,
    error: null,
    product: {}
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        loadProductsRequest: (state, action) => {
            state.loading = true;
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
        updateProductId: (state, action) => {},
        productDetailsRequest: (state, action) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product =  action.payload.product;
        },
        productDetailsErrors: (state, action) => {
            state.error = action.payload.error;
        }
    }   
});

export const {
    loadProductsRequest,
    loadProductsSuccess,
    loadProductsError,
    productDetailsRequest,
    productDetailsSuccess,
    productDetailsErrors,
    clearErrors
} = productsSlice.actions;

export default productsSlice.reducer;
 
