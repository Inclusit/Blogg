//Path: frontend/client/src/pages/createBlogPost.js

import React, { useState } from "react";
import { POST_REQUEST } from "../utils/requestHelpers";
import Editor from "../components/Editor";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

const CreateBlogPost = () => {
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("User"));
  /* console.log(storedUser._id); */

  const createNewPost = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      console.log("Användaren är inte inloggad för att skapa ett inlägg.");
      navigate("/login");
      return;
    }
    

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);
      formData.append("author", storedUser._id);

      const token = localStorage.getItem("AccessToken");
      console.log("USER INFO",storedUser._id);

      e.preventDefault();
      if (!title || !content || !image) {
        alert("Please fill in all fields");
        return;
      }

      if (image.size > 1024 * 1024) {
        alert("Image size is too large");
        return;
      }

      const response = await POST_REQUEST("/api/post/create", formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Token:", token);
      console.log("Response:", response);

      if (response.ok === "Created") {
        console.log("Blog post created:", response.response.data);
        setTitle("");
        setContent("");
        setImage(null);

        navigate("/");
      } else {
        console.error(
          "Error creating blog post:",
          response.response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating blog post:", error.message);
    }
  };
  return (
    <>
      <h1>Create Blog Post</h1>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="create-post-img-upload">
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <Editor
          value={content}
          onChange={setContent}
          title={title}
          setTitle={setTitle}
          image={image}
          setImage={setImage}
          onSubmit={createNewPost}
        />
        <div className="d-grid gap-2 submit-blogpost-btn">
          <button type="submit" className="btn btn-primary btn-create">
            Create post
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateBlogPost;
