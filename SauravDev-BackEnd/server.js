import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import MainRouter from "./Routes/index.js";

const app = express();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", 1);
dotenv.config();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://sauravshowcase.netlify.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Serve static files from uploads directory - IMPORTANT: Place this before routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  console.log("JWT_TOKEN", process.env.JWT_TOKEN);
  console.log("MONGODB_URL", process.env.MONGODB_URL);
  res.send("Hello World!");
});

app.use("/api/v1/", MainRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server Error:", error);
  res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    success: false,
  });
});

try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
