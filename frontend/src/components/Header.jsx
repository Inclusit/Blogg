import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Header = () => {
  const { isLoggedIn, logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header>
        <Link to="/" className="logo">
          MyBlog
          {isLoggedIn && currentUser ? (
            <p>Welcome, {currentUser.userName}</p>
          ) : (
            ""
          )}
        </Link>
        <nav>
          <>
            {isLoggedIn ? (
              <>
                <a onClick={handleLogout}>Logout</a>
                <Link to="/create">Create new post</Link>
                <Link to={`/profile/${currentUser.userName}`}>My blog</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </>
        </nav>
      </header>
    </>
  );
};

export default Header;
