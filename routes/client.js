import express from "express";
import { getSearch , getFalseUsers } from "../controllers/client.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/search", getSearch);
router.get("/toapprove", verifyToken , getFalseUsers);



export default router;