import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import errorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import modelUser from '../models/user.js'


export const isAuthenticateUser = catchAsyncErrors( async(req, res, next) => {

    const { token } = req.cookies
    
    if(!token) {
         return next(new errorHandler('Login first to access this resource', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await modelUser.findById(decoded.id);
    
    next();

});

