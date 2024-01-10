import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';
import Grid from 'gridfs-stream';
import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';
import helmet from 'helmet';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import path from "path";


import { fileURLToPath } from 'url';
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { users} from "./data/index.js";
import Transaction from "./models/Transaction.js";


//user 
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import adminRoutes from "./routes/admin.js";
import clientRoutes from "./routes/client.js";

import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";







/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });


  /* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes); 
app.use("/posts", postRoutes);
app.use("/admin", adminRoutes)
app.use("/client", clientRoutes);




  /* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    //  User.insertMany(users);
    // Post.insertMany(posts);
    // Transaction.insertMany(dataTransaction);

  })
  .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
  
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });