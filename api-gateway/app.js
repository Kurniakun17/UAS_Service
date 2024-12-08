const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../auth-service/src/middleware/authMiddleware");

const app = express();

app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  message: "Too many requests from this IP",
});

app.use(apiLimiter);

const authServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,
  pathRewrite: {
    "^/api/auth": "",
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["x-gateway-timestamp"] = Date.now();
  },
});

const barangServiceProxy = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,
  pathRewrite: {
    "^/api/barang": "",
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["x-gateway-timestamp"] = Date.now();
  },
});

app.use("/api/auth", authServiceProxy);
app.use("/api/barang", authMiddleware, barangServiceProxy);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Gateway error",
    error: process.env.NODE_ENV !== "production" ? err.message : {},
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
