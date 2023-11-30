import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/auth.Controller.js';

router.post('/register', registerUser);

export default router;
