// ==========================================
// BACKEND SETUP COMMANDS (Run in terminal):
// 1. npm init -y
// 2. Open package.json and add: "type": "module"
// 3. npm i express mongoose cors dotenv
// 4. (If JWT/auth is required): npm i jsonwebtoken bcryptjs
// 5. To run server: npm start (or node server.js)
// ==========================================

import app from "./app.js";
import connectDB from "./config/db.js";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
