const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const basicTreatmentRoutes = require("./routes/basicTreatmentRoutes");
const fillingRoutes = require("./routes/fillingRoutes");
const orthodonticRoutes = require("./routes/orthodonticRoutes");
const medicalHistoryRoutes = require("./routes/medicalHistoryRoutes");
const patientViewHistoryRoutes = require("./routes/patientViewHistoryRoutes");
const doctorViewHistoryRoutes = require("./routes/doctorViewHistoryRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is Running");
});

app.use("/user/admin", adminRoutes);
app.use("/user/doctor", doctorRoutes);
app.use("/user/patient", patientRoutes);
app.use("/treatment/basic-treatment", basicTreatmentRoutes);
app.use("/treatment/filling", fillingRoutes);
app.use("/treatment/orthodontic", orthodonticRoutes);
app.use("/api/medical-history", medicalHistoryRoutes);
app.use("/view/patientMedicalhistory", patientViewHistoryRoutes);
app.use("/view/doctorMedicalhistory", doctorViewHistoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
