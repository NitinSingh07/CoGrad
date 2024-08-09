import Event from "../models/event.model.js";
import User from "../models/user.model.js";

// Create an event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, location } = req.body;
    //console.log("req.body", req.body);
    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      organizer: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ error: "Error creating event" });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("organizer", "username");
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ error: "Error fetching events" });
  }
};

// Get a single event by ID
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "username")
      .populate("attendees", "username");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).json({ error: "Error fetching event" });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    Object.assign(event, req.body);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ error: "Error updating event" });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.organizer.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ error: "Error deleting event" });
  }
};

// Register for an event
const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("ID",id)
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ error: "Already registered" });
    }

    event.attendees.push(req.user._id);
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.error("Error registering for event:", error.message);
    res.status(500).json({ error: "Error registering for event" });
  }
};

// Get registered events for a user
const getRegisteredEvents = async (req, res) => {
  // console.log("Get registered events controller hit");
  // console.log("Request user:", req.user); // Log req.user

  try {
    if (!req.user || !req.user.id) {
      console.log("User not authenticated");
      return res.status(401).json({ error: "User not authenticated" });
    }

    const events = await Event.find({ attendees: req.user.id })
      .populate("organizer", "username")
      .exec();

    if (events.length === 0) {
      return res.status(404).json({ error: "No registered events found" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching registered events:", error.message);
    res.status(500).json({ error: "Error fetching registered events" });
  }
};

export {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getRegisteredEvents,
};
