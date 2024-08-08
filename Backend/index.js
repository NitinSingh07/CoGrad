// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js";
import bodyParser from "body-parser";

dotenv.config();
const PORT = 8000;
const app = express();

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
// server.js
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api", eventRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
