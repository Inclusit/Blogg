//Path: frontend/src/pages/myprofilePage.jsx

import React, { useState, useEffect } from 'react'
import { useAuth } from '../components/AuthProvider'
import { GET_REQUEST } from '../utils/requestHelpers'
import { DeleteButton, EditButton } from '../components/Buttons'

function myProfilePage() {
  const [posts, setPosts] = useState()
  const { currentUser } = useAuth()

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
    <>
      <div>
        <h1>Welcome to my blog</h1>
      </div>
      {posts ? (
        <div>
          {posts.map((post) => (
            <div className="post-container" key={post._id}>
              <div className="post-header">
                <h2>{post.title}</h2>
                <div classname="button-containers">
                  {(currentUser.admin ||
                    currentUser === post.author._id && post.author.userName) && (
                    <>
                      {console.log("Post ID:", post._id)}
                      <EditButton postId={post._id} />
                      <DeleteButton
                        createdBy={post.author._id}
                        currentUserId={currentUser._id}
                        isAdmin={currentUser.admin}
                        postId={post._id}
                        onDelete={() => handleDeletePost(post._id)}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="post-image">{post.image}</div>
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>No posts found</h2>
        </div>
      )}
    </>
  );
}

export default myProfilePage