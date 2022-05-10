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
			//default: "https://www.americandentalclinic.com/wp-content/uploads/2022/04/shutterstock_1893722440.jpg",
		},
		doctor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Doctor",
		},
	},
	{
		timestamps: true,
	}
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
