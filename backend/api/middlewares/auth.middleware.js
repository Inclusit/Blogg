//Path: backend/api/middlewares/auth.middleware.js

import { verifyAccessToken } from "../utils/jwtTokens.js";

export function authMiddleWare(req, res, next) {
  const token = req.header("Authorization") || "";
  const accessToken = String(token.split(" ")[1] || "");
  console.log("Access token:", accessToken);

  if (!accessToken) {
    return res.status(401).json({ message: "User does not have token" });
  }

  try {
    const verifiedToken = verifyAccessToken(accessToken);
    req.user = verifiedToken;
    return next();
    
  } catch (err) {
    console.log("Error verifying user:", err);
    res.status(401).json({
      message: "User not authorized",
    });
  }
}

/* export function checkUser */