import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Header = () => {
  const { isLoggedIn, logout, currentUser } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();

    navigate("/");
  };


  return (
    <>
      <header>
        <div className="user-info">
          {isLoggedIn && currentUser ? (
            <p>Welcome, {currentUser.userName}</p>
          ) : (
            ""
          )}
        </div>
        <Link to="/" className="logo">
          <h1>Share Space</h1>
          <p className="subtitle">- Share the best of you -</p>
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
