import mongoose from "mongoose";
import emailValidator from "../utils/emailValidator.js";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
      validate: {
          validator: emailValidator,
          message: 'Invalid email address',
      }
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },

    approved: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    viewedProfile: {
      type: Number,
      required: true,
    },
    enteredYear: {
      type: Number,
      required: true,
    },
    passOutYear: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    roleOfDegree: {
      type: String,
      required: true,
    },
    studentIdNumber: {
      type: String,
      required: true,
    },
    workPlace: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;