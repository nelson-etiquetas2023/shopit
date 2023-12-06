import { 
    updateProduct, 
    deleteProducts, 
    getProducts, 
    newProduct, 
    getsingleProduct 
} from '../controllers/product.Controller.js';

import {isAuthenticateUser, authorizeRoles} from '../middlewares/auth.js'
    
import express from 'express';
const router = express.Router();

router.get('/products',isAuthenticateUser, authorizeRoles('admin'), getProducts);

router.get('/product/:id',isAuthenticateUser, authorizeRoles('admin'), getsingleProduct);

router.post('/admin/product/new',isAuthenticateUser ,authorizeRoles('admin'), newProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProducts);

export default router;