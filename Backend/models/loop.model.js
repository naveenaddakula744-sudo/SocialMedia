import mongoose from "mongoose";

const loopSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    media: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    comments: [{
        author:{type: mongoose.Schema.Types.ObjectId, ref: "user"},
        message: {type: "string"}
    }]
},{timestamps: true});

const loop = mongoose.model("loop", loopSchema);
export default loop;