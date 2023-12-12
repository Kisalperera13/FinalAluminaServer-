// controllers/adminController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: passwordHash,
    });

    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) return res.status(400).json({ msg: "Admin does not exist." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};