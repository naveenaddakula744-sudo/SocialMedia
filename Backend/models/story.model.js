import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
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
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }
},{timestamps: true});

const story = mongoose.model("story", storySchema);

export default story;