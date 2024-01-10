// routes/adminRoutes.js
import express from "express";
import {  fetchAdmin} from "../controllers/admin.js"
import { adminApproveUser,adminRejectUser } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
router.use(verifyToken);

// Endpoint to fetch admin data
router.get('/fetchadmin', fetchAdmin);
router.put('/approve/:userId',verifyToken, adminApproveUser);
router.put('/reject/:userId', verifyToken, adminRejectUser);

export default router;
