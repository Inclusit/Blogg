import {Link} from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function Post({ title, content, image, createdAt, author, id, currentUser }) {

  const { isLoggedIn } = useAuth();
  
  const authorName = author && author.userName ? author.userName : "Anonymous";


  return (
    <div className="post">
      <div className="img-container">
        {<img src={image} alt="Post image" />}
      </div>
      <div className="texts">
        <h2>{title || "Entry Title"}</h2>

        <p className="info">
          <span className="author">
            By:{" "}
            <Link to={`/api/auth/user/${authorName}`} className="author-link">
              {authorName}
            </Link>
          </span>

          <time>{createdAt}</time>
        </p>
        {content ? (
          <div
            dangerouslySetInnerHTML={{ __html: `${content.slice(0, 170)}...` }}
          />
        ) : (
          <p>Content snippet</p>
        )}

        {isLoggedIn ? (
          <Link
            to={`${window.location.origin}/api/post/post/${id}`}
            className="read-more"
          >
            Read more...
          </Link>
        ) : (
          <Link to="/login" className="read-more">
            Log in to read more
          </Link>
        )}
      </div>
    </div>
  );
}
