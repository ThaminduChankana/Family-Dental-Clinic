const express = require("express");
const { getBlogs, createBlog, getBlogById, UpdateBlog, DeleteBlog } = require("../controllers/blogController");
const { protect } = require("../middlewares/authDoctorMiddleware");

const router = express.Router();

router.route("/").get(protect, getBlogs);
router.route("/create").post(protect, createBlog);
router.route("/:id").get(getBlogById).put(protect, UpdateBlog).delete(protect, DeleteBlog);

module.exports = router;
