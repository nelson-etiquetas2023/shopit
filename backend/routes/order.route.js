import express from 'express';
import { newOrder } from '../controllers/orderController.js';
import { isAuthenticateUser, authorizeRoles } from '../middlewares/auth.js'

const router = express.Router();

router.post('/order/new',isAuthenticateUser,authorizeRoles('admin'),newOrder);

export default router;