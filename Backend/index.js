// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js";
import userProfileRouter from "./routes/user.routes.js";
import bodyParser from "body-parser";
import connectdb from "./db/index.js";

const PORT = 8000;
connectdb()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   cors({
//     origin: "https://event-management-two-iota.vercel.app",
//     credentials: true,
//   })
// );
const allowedOrigins = [
  "https://event-management-two-iota.vercel.app", // Add your Vercel frontend URL here
  "http://localhost:5173", // Optional: Allow local development as well
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        // Allow requests with no origin (like mobile apps or curl requests)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api", eventRouter);
app.use("/api", userProfileRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
