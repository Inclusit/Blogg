//Path: frontend/src/pages/profilePage.jsx

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/AuthProvider'
import { GET_REQUEST } from '../utils/requestHelpers'
import { DeleteButton, EditButton } from '../components/Buttons'
import Post from '../components/Post'

function profilePage() {
  const [posts, setPosts] = useState()
  const { currentUser, isLoggedIn } = useAuth()

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const data = await GET_REQUEST(`/api/post/blog/id/${currentUser._id}`);
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        console.log("Response", data)
        setPosts(data);


      } catch (error) {
        console.error("Error fetching user posts:", error.message);
      }
    };

    if (currentUser && currentUser.userName) {
      fetchUserPosts();
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Welcome to my blog</h1>

      {posts ? (
        posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            content={post.content}
            image={post.image}
            createdAt={post.createdAt}
            author={post.author}
            id={post._id}
            currentUser={currentUser}
          />
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}

export default profilePage