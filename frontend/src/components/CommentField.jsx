import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import {
  POST_REQUEST,
  DELETE_REQUEST,
  GET_REQUEST,
} from "../utils/requestHelpers";
import { set } from "mongoose";

function CommentField({ blogPostId, AuthorId, AuthorName }) {
  const { currentUser, isLoggedIn } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("AccessToken");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await GET_REQUEST(`/api/comment/blog/${blogPostId}`);
        setComments(response);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [blogPostId, currentUser]);

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const response = await POST_REQUEST("/api/comment/create", {
        Authorization: `Bearer ${token}`,
        content: newComment,
        blogPost: blogPostId,
      });

      console.log("Comment created:", response);
      setComments([...comments, response.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Error creating comment:", error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await DELETE_REQUEST(`/api/comment/delete/${commentId}`);

      if (response && response.ok) {
        const updatedComments = comments.filter((c) => c._id !== commentId);
        console.log("Comment deleted:", response);
        setComments(updatedComments);
      }
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <p>You need to be logged in to comment!</p>
      ) : (
        <>
          <p>You are commenting as {currentUser.userName}</p>
          <form onSubmit={handleComment}>
            <textarea
              className="comment-field"
              name="comment"
              id="comment"
              value={newComment || ""}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={"Place your comment here..."}
              style={{ height: "100px", width: "100%" }}
            ></textarea>
            <div className="submit-comment-btn">
              <button type="submit">Submit</button>
            </div>
          </form>
        </>
      )}

      {loading && <p>Loading comments...</p>}

      {loading ? (
        <p>Loading comments...</p>
      ) : (
        comments.length > 0 &&
        comments
          .filter((comment) => comment && comment.content)
          .map((comment) => (
            <div key={comment._id} className="comment-container">
              <div className="comment-info">
                <p>
                  <span className="comment-user" style={{ fontSize: "small" }}>
                    Comment by{" "}
                    {comment.user?.userName
                      ? comment.user.userName
                      : "Anonymous"}
                  </span>
                </p>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </div>

              {currentUser &&
                (currentUser.admin ||
                  currentUser._id === comment.user._id ||
                  currentUser._id === AuthorId) && (
                  <div className="comment-button-container">
                    <button
                      className="delete-comment-btn"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
            </div>
          ))
      )}
    </>
  );
}

export default CommentField;
