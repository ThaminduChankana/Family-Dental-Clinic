const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const connectDB = require("./config/db");
const inventoryRoutes = require("./routes/InventoryRoutes");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is Running");
});

app.use("/user/admin", adminRoutes);
app.use("/user/doctor", doctorRoutes);
app.use("/user/patient", patientRoutes);

//Importing the Inventory Route
app.use("/user/inventory", inventoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));