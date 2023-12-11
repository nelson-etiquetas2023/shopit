import express from 'express';
const router = express.Router();
import { 
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails
} from '../controllers/auth.Controller.js';

import { authorizeRoles, isAuthenticateUser } from '../middlewares/auth.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/profile', isAuthenticateUser, getUserProfile);
router.put('/password/update', isAuthenticateUser , updatePassword);
router.put('/profile/update', isAuthenticateUser, updateProfile);
router.get('/admin/users',isAuthenticateUser, authorizeRoles('admin') ,allUsers);
router.get('/admin/users/:id',isAuthenticateUser,authorizeRoles('admin'),getUserDetails)
 
export default router;
 