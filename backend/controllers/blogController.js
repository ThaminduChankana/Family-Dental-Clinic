const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");

const getBlogs = asyncHandler(async (req, res) => {
	const blogs = await Blog.find();
	res.json(blogs);
});

const getBlogsForEachDoctor = asyncHandler(async (req, res) => {
	const blogs = await Blog.find({ doctor: req.doctor._id });
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

const getBlogCount = asyncHandler(async (req, res) => {
	const blog = await Blog.find({ year: new Date().getFullYear() });
	var z = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		e = 0;
	(f = 0), (g = 0), (h = 0), (i = 0), (j = 0), (k = 0), (l = 0);
	var loopData = {};
	var loopData = new Object();
	while (z < blog.length) {
		if (blog[z].createdAt.getMonth() + 1 === 01) {
			a = a + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 02) {
			b = b + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 03) {
			c = c + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 04) {
			d = d + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 05) {
			e = e + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 06) {
			f = f + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 07) {
			g = g + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 08) {
			h = h + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 09) {
			i = i + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 10) {
			j = j + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 11) {
			k = k + 1;
		} else if (blog[z].createdAt.getMonth() + 1 === 12) {
			l = l + 1;
		}
		z++;
	}
	var loopData = {
		january: a,
		february: b,
		march: c,
		april: d,
		may: e,
		june: f,
		july: g,
		august: h,
		september: i,
		october: j,
		november: k,
		december: l,
	};
	res.json(loopData);
});

module.exports = { getBlogs, getBlogsForEachDoctor, createBlog, getBlogById, UpdateBlog, DeleteBlog, getBlogCount };
