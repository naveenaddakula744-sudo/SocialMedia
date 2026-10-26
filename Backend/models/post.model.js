import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    mediaType: {
        type: String,
        //enum is used to restrict a field to a predefined set of allowed values.
        enum: ["image", "video"],
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
        author: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
        message: {type: String}
    }]
},{timestamps: true});

const post = mongoose.model("post", postSchema);

export default postSchema;