import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import BlogPost from "../models/blogPost.model.js";
import moment from "moment";


export async function createComment(req, res, next) {

    

    try {
        const comment = new Comment({
        content: req.body.content,
        blogPost: req.body.blogPost,
        user: req.user.id,
        });
        
        await comment.save();
        res.status(201).json(comment);
        console.log("new comment:", comment)

    } catch (err) {
        console.error("Error creating comment:", err.message);
        res.status(500).json({ message: "Failed to create comment" });
        console.log("user:", req.user)
    }
}

export async function getComments(req, res) {
    try {
        const comments = await Comment.find().populate("user", "userName").exec();
        res.status(200).json(comments);
    } catch (err) {
        console.error("Error displaying comments:", err.message);
        res.status(500).json({ message: "Failed to display comments" });
    }
}

export async function getCommentsByPost(req, res) {
    try {
        const { id } = req.params;

        const comments = await Comment.find({ blogPost: id })
        .populate("user", "userName")
        .exec();
        res.status(200).json(comments);
    }
    catch (err) {
        console.error("Error displaying comments:", err.message);
        res.status(500).json({ message: "Failed to display comments" });
    }
}

export async function deleteComment(req, res) {
    try {
        const { id } = req.params;

        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        console.error("Error deleting comment:", err.message);
        res.status(500).json({ message: "Failed to delete comment" });
    }
}

export async function updateComment(req, res) {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.content = content;
        await comment.save();
        res.status(200).json({ message: "Comment updated" });
    } catch (err) {
        console.error("Error updating comment:", err.message);
        res.status(500).json({ message: "Failed to update comment" });
    }
}