import express from 'express';
const router = express.Router();
import { registerUser,loginUser,logout,forgotPassword,resetPassword } from '../controllers/auth.Controller.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
 
export default router;
 