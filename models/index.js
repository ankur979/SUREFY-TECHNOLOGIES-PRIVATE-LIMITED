const Event = require("./event_model");
const User = require("./user_model");
const EventRegistration = require("./eventRegistration_model");

Event.belongsToMany(User, {
  through: EventRegistration,
  foreignKey: "eventId",
  otherKey: "userId",
});

User.belongsToMany(Event, {
  through: EventRegistration,
  foreignKey: "userId",
  otherKey: "eventId",
});
