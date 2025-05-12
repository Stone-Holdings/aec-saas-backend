const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

// Import your auth routes
const authRoutes = require("./routes/auth");

app.use(cors());
app.use(bodyParser.json()); // Middleware to parse JSON requests

// Set up routes
app.use("/signup", authRoutes);  // POST /signup -> handles user sign-up
app.use("/login", authRoutes);   // POST /login -> handles user login

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
