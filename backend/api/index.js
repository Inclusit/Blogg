//PATH: backend/api/index.js
import app from "./app.js";
import connectToDatabase from "./config/dbConfig.js";
const port = process.env.PORT || 3000;
const run = async () => {
  await connectToDatabase();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};
run();
