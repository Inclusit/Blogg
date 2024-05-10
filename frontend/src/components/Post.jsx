import {Link} from "react-router-dom";

export default function Post({ title, content, image, createdAt, author, id }) {

  const placeholderImage =
    "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1";
  
  const authorName = author && author.userName ? author.userName : "Anonymous";


  return (
    <div className="post">
      <div className="img-container">
        {<img src={image} alt="Post image"/>}
      </div>
      <div className="texts">
        <h2>{title || "Entry Title"}</h2>

        <p className="info">
          <span className="author">By: {authorName}</span>

          <time>{createdAt}</time>
        </p>
        {content ? (
          <div
            dangerouslySetInnerHTML={{ __html: `${content.slice(0, 170)}...` }}
          />
        ) : (
          <p>Content snippet</p>
        )}

        <Link
          to={`${window.location.origin}/api/post/post/${id}`}
          className="read-more"
        >
          Read more...
        </Link>
      </div>
    </div>
  );
}
