const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const getAdminblogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find();
	res.json(blogs);
});

const getBlogById = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog) {
		res.json(blog);
	} else {
		res.status(404).json({ message: "Blog article not found" });
	}
});

module.exports = { getAdminblogs, getBlogById };
