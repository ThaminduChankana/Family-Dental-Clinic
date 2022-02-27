const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();

app.get('/', (req, res) => {
  res.send("API is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));