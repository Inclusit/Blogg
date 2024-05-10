//Path: backend/api/controllers/blogPost.controller.js
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import BlogPost from "../models/blogPost.model.js";
import User from "../models/user.model.js";
import upload from "../middlewares/multerConfig.js";
import multer from "multer";

export async function createBlogPost(req, res) {

  if (!req.body) {
    return res.status(400).json({ message: "Data to update can not be empty" });
  }
  try {
    const { title, content } = req.body;
    const author = req.user.id;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Image file is required" });
    }



      const imageData = Buffer.from(req.file.buffer).toString(
        "base64",
        "binary"
      );
      const dataUri = `data:${req.file.mimetype};base64,${imageData}`;


    console.log("body:", req.body);

    const newPost = new BlogPost({
      title,
      content,
      image: dataUri,
      author,
    });
    console.log("user:", req.user.id);
    console.log("image:", image);

    await newPost.save();

    

    res.status(201).json(newPost);

    console.log("Blog post created:", newPost);
  } catch (err) {
    console.error("Error creating blog post:", err.message);
    res.status(500).json({ message: "Failed to create blog post" });
  }
}

export const handleFileUpload = upload.single("image");

export async function getBlogByUsername(req, res) {
  try {
    const { userName } = req.params;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await BlogPost.find({ author: user._id })
      .populate("author", "userName")
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error displaying blog posts:", err.message);
    res.status(500).json({ message: "Failed to display blog posts" });
  }
}

export async function getBlogById(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await BlogPost.find({ author: user._id })
      .populate("author", "userName")
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error displaying blog posts:", err.message);
    res.status(500).json({ message: "Failed to display blog posts" });
  }
}

export async function getBlogPostsByID(req, res) {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate("author", "userName")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    console.error("Error displaying blog post by ID:", err.message);
    res.status(500).json({ message: "Failed to display blog post by ID" });
  }
}

export async function getAllBlogPosts(req, res) {
  try {
    const posts = await BlogPost.find().populate("author", "userName").exec();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error displaying all blog posts:", err.message);
    res.status(500).json({ message: "Failed to display all blog posts" });
  }
}

export async function deleteBlogPost(req, res) {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog post:", err.message);
    res.status(500).json({ message: "Failed to delete blog post" });
  }
}

export async function updateBlogPost(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("Error editing blog post:", err.message);
    res.status(500).json({ message: "Failed to edit blog post" });
  }
}
