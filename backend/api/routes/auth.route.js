//Path: backend/api/routes/auth.route.js

import express from "express";
import {
  loginUser,
  userRegister,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/auth.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("User created through user route");
});

router.get("/test", (req, res) => {
  res.json("Test endpoint is working!");
});

router.post("/register", userRegister);

router.post("/login", loginUser);

router.get("/user", getUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser", authMiddleWare, deleteUser);

export default router;
