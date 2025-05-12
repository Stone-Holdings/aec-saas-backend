const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

// Routes
const authRoutes = require("./routes/auth");

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Mount auth routes under /api
app.use("/api", authRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
