import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

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
    resetPassWordExpire: Date
});

//Encrypting password before saving user.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
}
   
);

export default mongoose.model('User', userSchema);