const express = require("express");

const router = express.Router();

router.use("/events", require("./eventRoute"));
router.use("/users", require("./userRoute"));

module.exports = router;
