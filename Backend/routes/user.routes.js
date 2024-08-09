import express from "express";
import getUserProfile from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js"; // Ensure you have an authentication middleware

const router = express.Router();

// Apply the authentication middleware to the route
router.get("/auth/user-profile", auth, getUserProfile);

export default router;
