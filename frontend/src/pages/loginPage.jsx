//Path: frontend/src/pages/loginPage.jsx

import axios from "axios";
import { useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { POST_REQUEST, GET_REQUEST } from "../utils/requestHelpers";
import { useAuth } from "../components/AuthProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error user login:", err.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form className="login" onSubmit={handleLogin}>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Not a member? <a href="/register">Register here</a>
      </p>
    </>
  );
}
