import mongoose from "mongoose";
import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Get User Friends */
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
        enteredYear,
        passOutYear,
        phoneNumber,
        roleOfDegree,
        studentIdNumber,
        workPlace,
        country
      }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
          enteredYear,
          passOutYear,
          phoneNumber,
          roleOfDegree,
          studentIdNumber,
          workPlace,
          country
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    
    const formattedFriends = friends.map(
      ({
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
        enteredYear,
        passOutYear,
        phoneNumber,
        roleOfDegree,
        studentIdNumber,
        workPlace,
        country
      }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
          enteredYear,
          passOutYear,
          phoneNumber,
          roleOfDegree,
          studentIdNumber,
          workPlace,
          country
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE USER DETAILS */
const allowedFields = [
  "email",
  "firstName",
  "lastName",
  "location",
  "occupation",
  "enteredYear",
  "passOutYear",
  "phoneNumber",
  "workPlace",
  "country"
];

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const updatedUserData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updatedUserData[field] = req.body[field];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { updateUser };
