import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
      enteredYear,
      passOutYear,
      phoneNumber,
      whatsappNumber,
      studentIdNumber,
      roleOfDegree,
      extraQualification,
      workPlace,
      country,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      enteredYear,
      passOutYear,
      phoneNumber,
      whatsappNumber,
      studentIdNumber,
      roleOfDegree,
      extraQualification,
      workPlace,
      country,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  /* LOGGING IN */
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }; 
  
    /*  ADMIN LOGGING IN */
    export const loginAdmin = async (req, res) => {
      try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
    
        if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
        }
    
        const isPasswordValid = await admin.verifyPassword(password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
    
        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET);
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };