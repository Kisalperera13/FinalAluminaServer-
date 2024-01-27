import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  admin:{
    type:Boolean,
    required:true,
  }
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;