import express from 'express';
const router = express.Router();
import { registerUser, loginUser, logout } from '../controllers/auth.Controller.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
 

export default router;
