const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Doctor",
		},
		year: {
			default: new Date().getFullYear(),
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
