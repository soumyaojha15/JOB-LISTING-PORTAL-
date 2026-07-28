
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /\S+@\S+\.\S+/ 
    },
    password: {
        type: String,
        required: true,
    },
    isAccountVerified: {
        type: Boolean,
        default: false,
    },
    userType: {
        type: String,
        enum: ['applicant', 'recruiter'],
        default: 'applicant',
    },
});

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;