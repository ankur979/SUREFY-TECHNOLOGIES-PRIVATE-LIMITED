const { DataTypes } = require("sequelize");
const sequelize = require("../config/index");

const EventRegistration = sequelize.define(
  "EventRegistration",
  {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Event",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    registrationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("registered", "cancelled", "attended"),
      defaultValue: "registered",
    },
  },
  {
    tableName: "event_registrations",
    timestamps: false,
  }
);

module.exports = EventRegistration;
