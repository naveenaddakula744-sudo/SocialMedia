import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        require:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    bio: {
        type: String,
    },
    profession: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],
    loops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "loop"
    }],
    story: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "story"
    }],
    resetOtp: {
        type: String
    },
        otpExpires: {
        type: Date
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    }
},{timestamps:true});

const user = mongoose.model("user", userSchema);

export default user;