import uploadOnCloudinary from "../config/clodinary.js";
import user from "../models/user.model.js";
import Story from "../models/story.model.js";

export const uploadStory = async (req, res)=>{
    try {
        const user = await User.findById(req.userId);
        if(user.story){
            await story.findByIdAndDelete(user.story);
            user.story = null
        }

        const {mediaType} = req.body;
        let media;
        if(req.file){
            media = await uploadOnCloudinary(req.file.path)
        }
        else{
            return res.status(400).json({
                message: "media is Required"
            })
        }

        const story = await Story.create({author: req.userId, mediaType, media})
        user.story = story._id
        const populatedStory = await Story.findById(story._id).populate("author", "name username profileImage").populate("viewers", "name username profileImage");
        return res.status(200).json(populatedStory);

    } catch (error) {
        return res.status(500).json({
            message: `story Upload Error ${error}`
        })   
    }
}


export const viewStory = async (req, res) =>{
    try {
        const storyId = req.params.storyId
        const story = await Story.findById(storyId)

        if(!story){
            return res.status(404).json({
                message: "Story Not Found"
            })
        }

        const viewersId = story.viewers.map(id=>id.toString())

        //if user sees his own story not counted
        if (story.author.toString() === req.userId.toString()) {
            return res.status(200).json({
            message: "Own story view is not counted"
            })
        }     

        if (!viewersId.includes(req.userId.toString())) {
            story.viewers.push(req.userId);
            await story.save();
        }
        const populatedStory = await Story.findById(story._id).populate("author", "name username profileImage").populate("viewers", "name username profileImage");
        return res.status(200).json(populatedStory);

    } catch (error) {
        return res.status(500).json({
            message: `viewStory Error ${error}`
        })
    }
}


export const getStoryByuserName = async (req, res)=>{
    try {
        const username = req.params.username
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({
                message: "username is not found"
            })
        }

        const story = await Story.find({author: user._id}).populate("viewers author")
        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({
            message: `Error at getStoryByuserName ${error}`
        })
    }
}