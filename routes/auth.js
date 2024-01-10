import express from "express";
import { login,loginAdmin ,register,registerAdmin} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/loginadmin", loginAdmin);
router.post("/registeradmin", registerAdmin);



export default router;