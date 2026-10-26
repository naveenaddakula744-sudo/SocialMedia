import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { getStoryByuserName, uploadStory, viewStory } from "../controllers/story.controllers.js";
import { upload } from "../middlewares/multer.js";

const storyRouter = express.Router();

storyRouter.post("/upload", isAuth, upload.single("media") ,uploadStory)
storyRouter.get("/views/:storyId", isAuth, viewStory)
storyRouter.get("/getByuserName/:username", isAuth, getStoryByuserName)

export default storyRouter