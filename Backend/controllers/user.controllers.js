import uploadOnCloudinary from "../config/clodinary.js";
import User from "../models/user.model.js"

export const getCurrentUser = async (req,res) =>{
    try {
        const userId = req.userId
        const user = await User.findById(userId).populate("posts loops")

        if(!user){
            return res.status(400).json({
                message: "user not found"
            })
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: "Error occurs at getcurrentUser"
        })
    }
}

export const suggestedUsers = async (req, res)=>{
    try {
        const users = await User.find({_id:{$ne:req.userId}}).select("-password");
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({
            message: `Error occurs at suggestedUsers ${error}`
        })
    }
}


export const editProfile = async (req, res) => {
  try {
    const { name, username, bio, profession, gender } = req.body;

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Check whether the username is already taken
    const sameUserWithUserName = await User.findOne({ username });

    if (
      sameUserWithUserName &&
      sameUserWithUserName._id.toString() !== req.userId.toString()
    ) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    // Update profile image only when a new image is uploaded
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path);

      if (!uploadedImage) {
        return res.status(500).json({
          message: "Failed to upload profile image"
        });
      }

      user.profileImage = uploadedImage;
    }

    // Update other profile fields
    user.name = name;
    user.username = username;
    user.bio = bio;
    user.profession = profession;
    user.gender = gender;

    await user.save();

    return res.status(200).json(user);

  } catch (error) {
    console.error("Edit profile error:", error);

    return res.status(500).json({
      message: `Edit profile error: ${error.message}`
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `get profile error ${error}` });
  }
};
