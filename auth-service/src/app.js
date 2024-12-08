const express = require("express");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const authApp = express();
authApp.use(express.json());

authApp.use("/", authRoutes);

authApp.listen(3001, () => {
  console.log("Auth Service running on port 3001");
});
