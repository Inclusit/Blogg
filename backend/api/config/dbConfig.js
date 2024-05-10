//Path: backend/api/config/dbConfig.js

import mongoose from "mongoose";
import app from "../app.js";

const databaseURI = process.env.MONGODB_URI || "/individuell-uppgift-blogg";

export default async function connectToDatabase() {
  try {
    await mongoose.connect(databaseURI);
    console.log("Connected to DB:", databaseURI);
  } catch (err) {
    console.log("Could not connect to DB:", databaseURI, err.message);
  }
}
