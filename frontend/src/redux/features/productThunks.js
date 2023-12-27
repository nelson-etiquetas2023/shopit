import axios from 'axios';
import {
    loadProductsRequest,
    loadProductsSuccess,
    loadProductsError,
    clearErrors
} 
from './productSlice.js';

// get all products.
export const getproducts = () => async (dispatch) => {
    try {
        dispatch(loadProductsRequest());
        const { data } = await axios.get('http://localhost:4000/api/v1/products');
        dispatch(loadProductsSuccess({
            products: data.products,
            productCount: data.productCount
        }));
    } catch (error) {
        dispatch(loadProductsError({
            error: error.response.data.message
        }));
    }
}

// clear errors.
export const ClearErrors = () => async (dispatch) => {
    dispatch(clearErrors());
}






