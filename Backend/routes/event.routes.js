import express from "express";
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

const router = express.Router();

router.post("/create-event", auth, createEvent);
router.get("/getAll", getAllEvents);
router.get("/getevent/:id", getEvent);
router.put("/update-event/:id", updateEvent);
router.delete("/delete-event/:id", deleteEvent);
router.post("/event/register/:id", auth, registerForEvent);
router.get("/registered-events", auth, getRegisteredEvents);

export default router;
