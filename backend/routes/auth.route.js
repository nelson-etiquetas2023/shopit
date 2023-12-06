import express from 'express';
const router = express.Router();git

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
 

export default router;
