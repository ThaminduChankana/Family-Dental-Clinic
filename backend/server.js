const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const adminblogRoutes = require("./routes/adminblogRoutes");
const patientblogRoutes = require("./routes/patientblogRoutes");
dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is Running");
});

app.use("/user/admin", adminRoutes);
app.use("/user/doctor", doctorRoutes);
app.use("/user/patient", patientRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/adminblogs", adminblogRoutes);
app.use("/api/patientblog", patientblogRoutes);

app.get("/api/blogs", (req, res) => {
	res.json(blogs);
});

app.get("/api/blogs/:id", (req, res) => {
	const blog = blogs.find((n) => n._id === req.params.id);

	res.send(blog);
});

app.ge;

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on port ${PORT}..`));
