import express from "express";
import { createComment, getComments, getCommentsByPost, deleteComment } from "../controllers/comment.controller.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleWare, createComment);
router.get("/", getComments);
router.get("/blog/:id", getCommentsByPost);
router.delete("/delete/:id", authMiddleWare, deleteComment);

export default router;