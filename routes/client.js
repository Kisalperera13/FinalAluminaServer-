import express from "express";
import { getSearch } from "../controllers/client.js";

const router = express.Router();

router.get("/search", getSearch);

export default router;