import modelUser from '../models/user.js';
import errorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwtToken.js'
import catchErrorAsync from '../middlewares/catchAsyncErrors.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

export const registerUser = catchAsyncError( async ( req, res, next ) => {

    const { name, email, password } = req.body;

    const newUser = await modelUser.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'fgshfgsfjsdhgfjh34',
            url: 'https://res.cloudinary.com/dpsigbiwg/image/upload/v1701376152/user-sign-icon-person-symbol-human-avatar-vector-12693195_gudxit.jpg'
        },
    });

    //Save in Cookie.
    sendToken(newUser, 200, res);
        
});

//Forgot Password.
export const forgotPassword = catchErrorAsync(async ( req, res, next ) => {

    const user = await modelUser.findOne({ email: req.body.email });

    if(!user) {
        return next(new errorHandler('User not found with this email', 404));
    } 

    //Get reset token.
    const resetToken = user.getResetPasswordToken();
    await user.save( {validateBeforeSave: false} );

    //Create reset password url.
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    
    const message = `Your passsword reset token is as follow:\n\n${resetUrl}\n\nIf have not
    requested this email, then ignore it.`;

    try {

        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email Sent to: ${user.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPassWordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new errorHandler(error.message, 500));
    }

});

//Reset password => /api/v1/password/reset/:token
export const resetPassword = catchErrorAsync( async ( req, res, next ) => {

    //Hash URL token.
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    
    const user = await modelUser.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if(!user) {
        return next(new errorHandler('Password reset token is invalid or has been expired', 400))
    }

     if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler('Password does not match', 400));
     }

     //Setup new password.
     user.password = req.body.password;

     user.resetPasswordToken = undefined;
     user.resetPassWordExpire = undefined;

     await user.save();
     sendToken(user, 200, res);




}); 

//Login user => api/v1/login
export const loginUser = catchAsyncError( async ( req, res, next ) => {

    const {email, password} = req.body;

    //Check if email and password is entered by user.
    if(!email || !password) {
        return next(new errorHandler('Please enter email & password',400));
    }

    //Finding user in database.
    const user = await modelUser.findOne({ email }).select('+password');

    if (!user) {
        return next(new errorHandler('Invalid Email or Password', 401));
    }

    //Checks if password is correct or not.
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new errorHandler('InvalidEmail or Password', 401))
    }

    sendToken(user, 200, res);

});

// Logout user => /api/v1/logout. 
export const logout = catchAsyncError( async ( req, res, next ) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'Logged out.'
    });

});