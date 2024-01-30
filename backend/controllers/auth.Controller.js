import modelUser from "../models/user.js";
import errorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncErrors.js";
import sendToken from "../utils/jwtToken.js";
import catchErrorAsync from "../middlewares/catchAsyncErrors.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.body.avatar, {
    folder: "shopit/avatar",
    width: 150,
  });

  const { name, email, password } = req.body;

  const newUser = await modelUser.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  //Save in Cookie.
  sendToken(newUser, 200, res);
});

//Get currently logged in user details => /api/v1/profile.(me)
export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await modelUser.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update / Change password  => api/v1/password/update.
export const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await modelUser.findById(req.user.id).select("+password");
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new errorHandler("Old paassword is incorrect.", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update user profile.
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (!req.body.email) {
    return next(new errorHandler("email not entered...", 400));
  }

  //Update avatar.

  if (req.body.avatar !== "") {
    const user = await modelUser.findById(req.body.id);
    const image_id = user.avatar.public_id;
    const res = await cloudinary.uploader.destroy(image_id);

    const result = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "shopit/avatar",
      width: 150,
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await modelUser.findByIdAndUpdate(req.body.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile => /api/v1/admin/update/:id
export const updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await modelUser.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//Forgot Password.
export const forgotPassword = catchErrorAsync(async (req, res, next) => {
  const user = await modelUser.findOne({ email: req.body.email });

  if (!user) {
    return next(new errorHandler("User not found with this email", 404));
  }

  //Get reset token.
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  //Create reset password url.
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your passsword reset token is as follow:\n\n${resetUrl}\n\nIf have not
    requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPassWordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new errorHandler(error.message, 500));
  }
});

//Reset password => /api/v1/password/reset/:token
export const resetPassword = catchErrorAsync(async (req, res, next) => {
  //Hash URL token.
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await modelUser.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new errorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new errorHandler("Password does not match", 400));
  }

  //Setup new password.
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPassWordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//Login user => api/v1/login
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password is entered by user.
  if (!email || !password) {
    return next(new errorHandler("Please enter email & password", 400));
  }

  //Finding user in database.
  const user = await modelUser.findOne({ email }).select("+password");

  if (!user) {
    return next(new errorHandler("Invalid Email or Password", 401));
  }

  //Checks if password is correct or not.
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new errorHandler("InvalidEmail or Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout user => /api/v1/logout.
export const logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out.",
  });

  console.log("Logged out.");
});

export const allUsers = catchAsyncError(async (req, res, next) => {
  const users = await modelUser.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get user details => /api/v1/admin/user/:id
export const getUserDetails = catchErrorAsync(async (req, res, next) => {
  const user = await modelUser.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await modelUser.findById(req.params.id);

  if (!user) {
    return next(
      new errorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  //remove avatar from cloudinary - TODO.

  await modelUser.deleteOne(user);

  res.status(200).json({
    success: true,
  });
});
