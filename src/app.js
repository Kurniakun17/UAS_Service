const express = require("express");
const sequelize = require("./config/database");
const barangRoutes = require("./routes/barangRoutes");
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/barang', authMiddleware, barangRoutes);
app.use('/api/auth', authRoutes);


sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
