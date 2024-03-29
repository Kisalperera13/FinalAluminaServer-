import express from "express";
import { getFeedPosts, getUserPosts, likePost ,deletePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);


/* DELETE*/
router.delete('/delete/:postId', deletePost);


export default router;