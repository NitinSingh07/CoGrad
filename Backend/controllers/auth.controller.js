import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import errHandler from "../utilities/error.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    return next(errHandler(400, "All fields are required"));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ userName, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errHandler(400, "Invalid credentials"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errHandler(400, "Invalid credentials"));
    }
    const { password: _, ...rest } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "30d",
    });
    console.log("Token:", token);

    const options = {
      httpOnly: false,
      secure: true, // Adjust based on environment
    };
    return res
      .status(200)
      .cookie("access_token", token, options) // Set the cookie
      .json({ message: "User logged in successfully", user: rest, token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export { signUp, signIn };
