import express from "express"
import { github_oauth, github_oauth_callback, google_oauth, google_oauth_callback } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Github
authRouter.get("/github", github_oauth);
authRouter.get("/github/callback", github_oauth_callback);

//Google
authRouter.get("/google", google_oauth)
authRouter.get("/google/callback", google_oauth_callback)

export default authRouter;