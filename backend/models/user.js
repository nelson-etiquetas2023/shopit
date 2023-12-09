import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true, 
        validate: [validator.isEmail, 'Please enter valid email addres'] 
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must beb longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
         type: Date,
         default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypting password before saving user.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

// Compare password user.
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}

// Return JWT token.
userSchema.methods.getJwtToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
    return token;
}

//Generate password reset token.
userSchema.methods.getResetPasswordToken = function () {
    
    //Generate Token with Crypto
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and set to resetPasswordToken.
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set token expire  time.
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;


}


export default mongoose.model('User', userSchema);  