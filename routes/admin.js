// routes/adminRoutes.js
import express from "express";
import {registerAdmin, loginAdmin } from "../controllers/admin.js"

const router = express.Router();

// Admin registration
router.post("/register", registerAdmin);

// Admin login
router.post("/login", loginAdmin);

export default router;
