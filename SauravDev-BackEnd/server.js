import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import MainRouter from "./Routes/index.js";

const app = express();
app.set("trust proxy", 1);
dotenv.config();
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://sauravshowcase.netlify.app",
    "https://personalportfolio-production-eb7b.up.railway.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log("JWT_TOKEN", process.env.JWT_TOKEN);
  console.log("MONGODB_URL", process.env.MONGODB_URL);
  res.send("Hello World!");
});

app.use("/api/v1/", MainRouter);
app.use("/uploads", express.static("uploads"));

try {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}

app.listen(8000, () => {
  console.log("Server is running on port http://localhost:8000");
});
