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
    console.log("Connected to MongoDB")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

dotenv.config();

const app = express();

// mongoose
//   .connect(
//     "mongodb+srv://nitin-event-app:nitinevent123@cluster0.d3h0d.mongodb.net/",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       ssl: false, 
//     }
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
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
