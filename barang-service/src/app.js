const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const barangRoutes = require("./routes/barangRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Database Connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

app.use("/", barangRoutes);

sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Barang Service running on port 3002");
  });
});
