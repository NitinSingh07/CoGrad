import express from "express";

const router = express.Router();
import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getRegisteredEvents,
} from "../controllers/event.controller.js";

import auth from "../middlewares/auth.middleware.js";

router.post("/create-event", auth, createEvent);
router.get("/getAll", getAllEvents);
router.get("/getevent/:id", getEvent);
router.put("/update-event/:id", auth, updateEvent);
router.delete("/delete-event/:id", auth, deleteEvent);
router.post("/event/:id/register", auth, registerForEvent);
router.get("/registered-events", auth, getRegisteredEvents);

export default router;
