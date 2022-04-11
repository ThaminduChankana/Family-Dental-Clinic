const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const getBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find();
	res.json(blogs);
});

const createBlog = asyncHandler(async (req, res) => {
	const { title, description, image } = req.body;

	if (!title || !description || !image) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const blog = new Blog({ doctor: req.doctor._id, title, description, image });

		const createdBlog = await blog.save();

		res.status(201).json(createdBlog);
	}
});

const getBlogById = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog) {
		res.json(blog);
	} else {
		res.status(404).json({ message: "Blog article not found" });
	}
});

const UpdateBlog = asyncHandler(async (req, res) => {
	const { title, description, image } = req.body;

	const blog = await Blog.findById(req.params.id);

	if (blog.doctor.toString() !== req.doctor._id.toString()) {
		res.status(401);
		throw new Error("You can't perform this action");
	}

	if (blog) {
		blog.title = title;
		blog.description = description;
		blog.image = image;

		const updatedBlog = await blog.save();
		res.json(updatedBlog);
	} else {
		res.status(404);
		throw new Error("Blog article not found");
	}
});

const DeleteBlog = asyncHandler(async (req, res) => {
	const blog = await Blog.findById(req.params.id);

	if (blog.doctor.toString() !== req.doctor._id.toString()) {
		res.status(401);
		throw new Error("You can't perform this action");
	}

	if (blog) {
		await blog.remove();
		res.json({ message: "Blog article removed" });
	} else {
		res.status(404);
		throw new Error("Blog article not found");
	}
});

module.exports = { getBlogs, createBlog, getBlogById, UpdateBlog, DeleteBlog };
