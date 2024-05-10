//Path: backend/api/app.js

import express from "express";
import cors from "cors";
import userRouter from "./routes/auth.route.js";
import postRoutes from "./routes/blogPost.route.js";
import commentRouter from "./routes/comment.route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRouter);

export default app;
