import React, { useEffect, useState } from 'react'
import Editor from "../components/Editor";
import { GET_REQUEST, PUT_REQUEST } from '../utils/requestHelpers';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";

function EditBlogPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchPost = async () => {
      try {
        const response = await GET_REQUEST(`/api/post/post/${postId}`);
        console.log("Response:", response);
        setTitle(response.title);
        setContent(response.content);
        setImage(response.image);
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();

  }, [postId]);


  async function handleEditPost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await PUT_REQUEST(`/api/post/update/${postId}`, formData);
      if (response.ok) {
        console.log("Blog post updated:", response.response.data);
        setTitle("");
        setContent("");
        setImage(null);
        navigate(`/api/post/post/${postId}`);
      } else {
        console.error(
          "Error updating blog post:",
          response.response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating blog post:", error.message);
    }
  }
  

  return (
    <>
      <h1>Edit Blog Post</h1>

      <form className="edit-form" onSubmit={handleEditPost}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <Editor value={content} onChange={(value) => setContent(value)} />
        <div className='submit-edit-btn'>
          <button type="submit">Update Post</button>
        </div>
      </form>
    </>
  );
}

export default EditBlogPost;