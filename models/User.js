import mongoose from "mongoose";

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
      enteredYear: {
        type: Number,
        required: true,
      },
      passOutYear: {
        type: Number,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      whatsappNumber: {
        type: String,
        required: true,
      },
      studentIdNumber: {
        type: String,
        required: true,
      },
      roleOfDegree: {
        type: String,
        required: true,
      },
         
      extraQualification: String,
      workPlace: String,
      country: String,
      location: String,
      occupation: String,
      viewedProfile: Number,
      impressions: Number,
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", UserSchema);
  export default User;