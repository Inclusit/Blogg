//Path: backend/api/controllers/blogPost.controller.js

import express from "express";
import {
  createBlogPost,
  handleFileUpload,
  getBlogByUsername,
  getBlogById,
  getBlogPostsByID,
  getAllBlogPosts,
  deleteBlogPost,
  updateBlogPost
} from "../controllers/blogPost.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/create", handleFileUpload, authMiddleWare, createBlogPost);
router.get("/blog/:userName", getBlogByUsername);
router.get("/blog/id/:id", getBlogById);
router.get("/post/:id", getBlogPostsByID);
router.get("/posts", getAllBlogPosts);
router.delete("/delete/:id", authMiddleWare, deleteBlogPost);
router.put("/update/:id", authMiddleWare, updateBlogPost);


export default router;