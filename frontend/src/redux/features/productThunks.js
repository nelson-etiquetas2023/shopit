import axios from "axios";
import {
  loadProductsRequest,
  loadProductsSuccess,
  loadProductsError,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsErrors,
  clearErrors,
} from "./productSlice.js";

// get all products.
export const getproducts = () => async (dispatch) => {
  try {
    dispatch(loadProductsRequest());
    const { data } = await axios.get("http://localhost:4000/api/v1/products");
    dispatch(
      loadProductsSuccess({
        products: data.products,
        productCount: data.productCount,
      })
    );
  } catch (error) {
    dispatch(
      loadProductsError({
        error: error.response.data.message,
      })
    );
  }
};
// get datails of products.
export const getProductId = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsRequest());
    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
   
    dispatch(productDetailsSuccess({
        product: data.product
    }));

  } catch (error) {
    dispatch(
      productDetailsErrors({
        error: error.response.data.message,
      })
    );
  }
};
// clear errors.
export const ClearErrors = () => async (dispatch) => {
  dispatch(clearErrors());
};
