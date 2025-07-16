require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/index.js");
require("./models/index.js");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
