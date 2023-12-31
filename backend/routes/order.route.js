import express from 'express';
import { 
    newOrder,
    getSingleOrder,
    myOrders,
    allOrders,
    updateOrder,
    deleteOrder
 } from '../controllers/orderController.js';
import { isAuthenticateUser, authorizeRoles } from '../middlewares/auth.js'

const router = express.Router();

router.post('/order/new',isAuthenticateUser,authorizeRoles('admin'),newOrder);
router.get('/order/:id',isAuthenticateUser,authorizeRoles('admin'),getSingleOrder);
router.get('/orders/me',isAuthenticateUser,authorizeRoles('admin'),myOrders);
router.get('/admin/orders',isAuthenticateUser,authorizeRoles('admin'),allOrders);
router.put('/admin/order/:id',isAuthenticateUser,authorizeRoles('admin'),updateOrder);
router.delete('/admin/order/:id',isAuthenticateUser,authorizeRoles('admin'),deleteOrder);

export default router;  