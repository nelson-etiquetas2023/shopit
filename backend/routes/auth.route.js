import express from 'express';
const router = express.Router();
import { 
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile
} from '../controllers/auth.Controller.js';

import { isAuthenticateUser } from '../middlewares/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/profile', isAuthenticateUser, getUserProfile);

 
export default router;
 