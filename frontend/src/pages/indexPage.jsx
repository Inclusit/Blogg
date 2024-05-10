//Path: frontend/src/pages/indexPage.jsx

import Post from "../components/Post";
import { useEffect, useState } from "react";
import { GET_REQUEST } from "../utils/requestHelpers";

export default function IndexPage() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try { const data = await GET_REQUEST("/api/post/posts");
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPost(data);
      console.log("image", data.image)
  
    } catch (err) {
      console.error("Error fetching post:", err.message);
    }
  }
    

    fetchPost();
  }, []);

  return (
    <div className="frontpage-post-container">
      {post.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          createdAt={post.createdAt}
          author={post.author}
          id={post._id}
        />
      ))}
    </div>
  );
}
