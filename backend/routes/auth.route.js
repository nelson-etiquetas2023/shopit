import express from 'express';
const router = express.Router();
import { registerUser,loginUser,logout,forgotPassword } from '../controllers/auth.Controller.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword)
 

export default router;
