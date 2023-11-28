import { updateProduct, 
    deleteProducts, 
    getProducts, 
    newProduct, getsingleProduct } from '../controllers/product.Controller.js';
    
import express from 'express';
const router = express.Router();

router.get('/products', getProducts);

router.get('/product/:id', getsingleProduct);

router.post('/newProduct', newProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProducts);

export default router




