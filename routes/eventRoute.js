const express = require("express");
const {
  getAllEvents,
  createEvent,
  updateEvent,
  getEventDetails,
  getEventStats,
  listUpcomingEvents,
  registerForEvent,
  cancelRegistration,
} = require("../controllers/eventController");

const router = express.Router();
router.get("/", getAllEvents);

router.post("/", createEvent);
router.put("/:id", updateEvent);

router.get("/upcoming", listUpcomingEvents);
router.get("/:id", getEventDetails);
router.get("/:id/stats", getEventStats);
router.post("/:id/register", registerForEvent);
router.delete("/:id/:userId/cancel", cancelRegistration);

module.exports = router;
