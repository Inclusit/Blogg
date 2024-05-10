//Path: backend/api/utils/jwtTokens.js

import jwt from "jsonwebtoken";

export function generateAccessAndRefreshToken(user) {
  const accesstoken = jwt.sign(
    {
      userName: user.userName,
      id: user._id,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );

  const refreshToken = jwt.sign(
    {
      userName: user.userName,
      id: user._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    access: accesstoken,
    refresh: refreshToken,
  };
}

export function verifyAccessToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  console.log("verify token", verifiedToken);
  return verifiedToken;
}

export function verifyRefreshToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  console.log("verify token", verifiedToken);
  return verifiedToken;
}
