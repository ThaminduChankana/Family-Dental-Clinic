const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const getFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.find();
	res.json(feedback);
});

const createFeedback = asyncHandler(async (req, res) => {
	const { name, patient_email, review_description, rating_count } = req.body;

	if (!name || !patient_email || !review_description || !rating_count) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const feedback = new Feedback({
			name,
			patient_email,
			review_description,
			rating_count,
		});

		const createdFeedback = await feedback.save();

		res.status(201).json(createdFeedback);
	}
});

const getFeedbackById = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById(req.params.id);

	if (feedback) {
		res.json(feedback);
	} else {
		res.status(404).json({ message: "Feedback not found" });
	}
});

const UpdateFeedback = asyncHandler(async (req, res) => {
	const { name, patient_email, review_description, rating_count } = req.body;

	const feedback = await Feedback.findById(req.params.id);

	if (feedback) {
		feedback.name = name;
		feedback.patient_email = patient_email;
		feedback.review_description = review_description;
		feedback.rating_count = rating_count;

		const UpdateFeedback = await feedback.save();
		res.json(UpdateFeedback);
	} else {
		res.status(404);
		throw new Error("Feedback not found");
	}
});

const DeleteFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.findById(req.params.id);

	if (feedback) {
		await feedback.remove();
		res.json({ message: "Feedback Removed" });
	} else {
		res.status(404);
		throw new Error("Feedback not Found");
	}
});

module.exports = {
	getFeedback,
	createFeedback,
	getFeedbackById,
	UpdateFeedback,
	DeleteFeedback,
};
