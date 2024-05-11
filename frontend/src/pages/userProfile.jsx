// Exempel UserProfile.js

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { GET_REQUEST } from "../utils/requestHelpers";
import { useAuth } from "../components/AuthProvider";

export default function UserProfile() {
  const { userName } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await GET_REQUEST(`/api/auth/user/${userName}`);
      setUser(user);
    };

    const fetchPosts = async () => {
      const posts = await GET_REQUEST(`/api/post/blog/${userName}`);
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setLoading(false);
      setPosts(posts);
    };

    fetchUser();
    fetchPosts();
  }, [userName]);

  if (loading) {
    return <h2>Loading blog...</h2>;
  }

  return (
    <>
      <h1>{user.userName}'s blog</h1>

      {posts.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          createdAt={post.createdAt}
          author={post.author}
          id={post._id}
          currentUser={isLoggedIn}
        />
      ))}
      
    </>
  );
}
