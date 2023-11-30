import modelUser from '../models/user.js';
import errorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncErrors.js';

export const registerUser = catchAsyncError( async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await modelUser.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'fgshfgsfjsdhgfjh34',
            url: 'https://res.cloudinary.com/dpsigbiwg/image/upload/v1701376152/user-sign-icon-person-symbol-human-avatar-vector-12693195_gudxit.jpg'
        },
    });

    res.status(201).json({
        success: true,
        user
    });

});