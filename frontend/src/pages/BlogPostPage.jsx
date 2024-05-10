import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_REQUEST } from "../utils/requestHelpers";
import { DeleteButton, EditButton } from "../components/Buttons";
import { useAuth } from "../components/AuthProvider";
import CommentField from "../components/CommentField";

import React from "react";

function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await GET_REQUEST(`/api/post/post/${id}`);
        console.log("Data:", data);
        setLoading(false);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err.message);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const isAuthorOrAdmin =
    currentUser && (currentUser.admin || currentUser._id === post.author._id);

  return (
    <>
      <div className="post-container">
        <div className="post-header">
          <div className="post-header-details">
            <h2>{post.title}</h2>
            <p>
              <span style={{ fontSize: "small" }}>
                Written by {post.author.userName}
              </span>
            </p>
          </div>
          <div>
            {isAuthorOrAdmin && (
              <div className="button-container">
                <div>
                  <EditButton postId={post._id} />
                </div>
                <div>
                  <DeleteButton
                    createdBy={post.author._id}
                    currentUserId={currentUser ? currentUser._id : null}
                    isAdmin={currentUser ? currentUser.admin : false}
                    postId={post._id}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="post-image">
          <img src={post.image} alt="Post image" />
          {console.log("Post image:", post.image)}
        </div>

        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
      </div>
      <CommentField
        blogPostId={post._id}
        AuthorId={post.author._id}
        AuthorName={post.author.userName}
      />
    </>
  );
}

export default BlogPostPage;
