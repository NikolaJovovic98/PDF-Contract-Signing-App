import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email missing'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password missing'],
        minlength : 6,
        select : false
    },
    is_admin : {
        type : Boolean,
        default : false,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;