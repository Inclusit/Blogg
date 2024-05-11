//Path: frontend/src/components/AuthProvider.jsx

//UseRef, UseReducer 

import React, { createContext, useContext, useState, useEffect } from "react";
import { POST_REQUEST } from "../utils/requestHelpers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("AccessToken")
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("User")) || null
  );

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
    console.log("User logged in:", storedUser);
  }, []);
  

  const login = async (email, password) => {
    try {
      const response = await POST_REQUEST("/api/auth/login", {
        email,
        password
      });

      const { user, token } = response.data;
      const tokenString = JSON.stringify(token);

      localStorage.setItem("AccessToken", tokenString);

      localStorage.setItem("User", JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      console.log("User logged in:", user);
      console.log("Token:", token);

      return true; 
    } catch (err) {
      console.error("Error user login:", err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
