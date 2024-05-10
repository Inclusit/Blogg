//Path: backend/api/controllers/auth.controller.js

import {
  registerUserErrorHandler,
  userWithoutPassword,
} from "../helpers/api.helper.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../utils/jwtTokens.js";

export async function userRegister(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Data to update can not be empty" });
  }
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
    const token = generateAccessAndRefreshToken(newUser);
    console.log("User created:", newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("oops something went wrong");
  }
}

export async function loginUser(req, res) {
  console.log("test login", req.body)
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordIsTheSame = await bcrypt.compare(password, user.password);

    if (!passwordIsTheSame) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateAccessAndRefreshToken(user);
    console.log(user);

    res.status(200).json({
      user: userWithoutPassword(user),
      token: token,
    });
    console.log(user, token);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Failed to get user" });
  }
}

export async function getUserByUsername(req, res) {
  try {
    const user = await User.findOne({ userName: req.params.userName }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (err) {
    console.error("Get user by username error:", err);
    res.status(500).json({ message: "Failed to get user" });
  }
}

export async function updateUser(req, res) {
  console.log("Update User Request Body:", req.body);
  console.log("Update User Params:", req.params);
  try {
    const user = req.params.id;
    const updatedUserData = req.body;

    console.log("User ID to Update:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(user, updatedUserData, {
      new: true,

    });
    res.status(200).json(updatedUser);
  }
  catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
}