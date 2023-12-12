import express from 'express';
import { 
    newOrder,
    getSingleOrder,
    myOrders
 } from '../controllers/orderController.js';
import { isAuthenticateUser, authorizeRoles } from '../middlewares/auth.js'

const router = express.Router();

router.post('/order/new',isAuthenticateUser,authorizeRoles('admin'),newOrder);
router.get('/order/:id',isAuthenticateUser,authorizeRoles('admin'),getSingleOrder);
router.get('/orders/me',isAuthenticateUser,authorizeRoles('admin'),myOrders)

export default router;