import express from "express";
const router = express.Router();

import { 
    updateProduct, 
    deleteProducts, 
    getProducts, 
    newProduct, 
    getsingleProduct,
    createProductReview,
    getProductReviews,
    deleteReview    
} from '../controllers/product.Controller.js';

import {isAuthenticateUser, authorizeRoles} from '../middlewares/auth.js'


router.get('/products',isAuthenticateUser, authorizeRoles('admin'), getProducts);
router.get('/product/:id',isAuthenticateUser, authorizeRoles('admin'), getsingleProduct);
router.post('/admin/product/new',isAuthenticateUser ,authorizeRoles('admin'), newProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProducts);
router.put('/review',isAuthenticateUser,createProductReview);
router.get('/reviews',isAuthenticateUser,getProductReviews);
router.delete('/reviews',isAuthenticateUser,deleteReview);

export default router;


