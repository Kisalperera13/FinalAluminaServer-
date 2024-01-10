// controllers/adminController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";


//fetch admin data
export const fetchAdmin = async (req, res) => {
  try {
    // Fetch admin information from your API
    const admin = await Admin.findOne(/* Add your query here */);

    // Send the admin data as the response
    res.json(admin);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const adminApproveUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { approved: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Optionally, send an email to the user notifying them of the approval.

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const adminRejectUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { approved: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send a rejection email to the user.
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Account Rejection',
      text: 'Your account request has been declined. Please contact support for more information.',
    };

    await transporter.sendMail(mailOptions);

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


