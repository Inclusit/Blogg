//Path: frontend/client/src/App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/indexPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import CreatePage from "./pages/createBlogPost";
import myProfilePage from "./pages/myProfilePage";
import BlogPostPage from "./pages/BlogPostPage";
import EditBlogPost from "./pages/editBlogPost";
import UserProfile from "./pages/userProfile";
import { AuthProvider } from "./components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path="profile/:userId" element={<myProfilePage />} />
          <Route path="api/post/post/:id" element={<BlogPostPage />} />
          <Route path="api/post/update/:postId" element={<EditBlogPost />} />
          <Route path="api/auth/user/:userName" element={<UserProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
