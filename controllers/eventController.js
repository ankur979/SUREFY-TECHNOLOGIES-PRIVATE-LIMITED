const Event = require("../models/event_model");
const User = require("../models/user_model");

const { Op } = require("sequelize");

const createEvent = async (req, res) => {
  const { title, description, datetime, location, capacity } = req.body;
  if (!title || !datetime || !location || !capacity) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (capacity < 1 || capacity > 1000) {
    return res
      .status(400)
      .json({ message: "Capacity must be between 1 and 1000" });
  }

  try {
    const newEvent = await Event.create({
      title,
      description,
      datetime,
      location,
      capacity,
    });
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getEventDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id, {
      include: [
        {
          model: User,
          through: { attributes: [] },
        },
      ],
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event details:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, datetime, location, capacity } = req.body;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (capacity < 1 || capacity > 1000) {
      return res
        .status(400)
        .json({ message: "Capacity must be between 1 and 1000" });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.datetime = datetime || event.datetime;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;

    await event.save();
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const listUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        datetime: {
          [Op.gt]: new Date(),
        },
      },
      order: [
        ["datetime", "ASC"],
        ["location", "ASC"],
      ],
    });

    res.json(events);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getEventStats = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const total = await event.countUsers();
    const remaining = event.capacity - total;
    const percentage = ((total / event.capacity) * 100).toFixed(2);

    res.json({
      totalRegistrations: total,
      remainingCapacity: remaining,
      percentageUsed: `${percentage}%`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    const { userId } = req.body;

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (new Date(event.datetime) < new Date()) {
      return res
        .status(400)
        .json({ message: "Cannot register for past event" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyRegistered = await event.hasUser(user);
    if (alreadyRegistered) {
      return res.status(400).json({ message: "User already registered" });
    }

    const count = await event.countUsers();
    if (count >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    await event.addUser(user);
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const cancelRegistration = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    const userId = req.params.userId;

    if (!event) return res.status(404).json({ message: "Event not found" });

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isRegistered = await event.hasUser(user);
    if (!isRegistered) {
      return res
        .status(400)
        .json({ message: "User is not registered for this event" });
    }

    await event.removeUser(user);
    res.json({ message: "Registration cancelled successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventDetails,
  registerForEvent,
  cancelRegistration,
  listUpcomingEvents,
  getEventStats,
  updateEvent,
};
