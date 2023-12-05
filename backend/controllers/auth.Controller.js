import modelUser from '../models/user.js';
import errorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwtToken.js'

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