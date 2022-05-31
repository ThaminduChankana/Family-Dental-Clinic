const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const getFeedbackforAdmin = asyncHandler(async (req, res) => {
	const feedback = await Feedback.find();
	res.json(feedback);
});

const getFeedback = asyncHandler(async (req, res) => {
	const feedback = await Feedback.find({ isAdmin: true });
	res.json(feedback);
});

const getFeedbackforPatient = asyncHandler(async (req, res) => {
	const feedback = await Feedback.find({ patient: req.patient._id, isAdmin: true });
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
			patient: req.patient._id,
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

const updateFeedback = asyncHandler(async (req, res) => {
	const { name, patient_email, review_description, rating_count } = req.body;

	const feedback = await Feedback.findById(req.params.id);

	if (feedback) {
		feedback.name = name;
		feedback.patient_email = patient_email;
		feedback.review_description = review_description;
		feedback.rating_count = rating_count;

		const UpdatedFeedback = await feedback.save();
		res.json(UpdatedFeedback);
	} else {
		res.status(404);
		throw new Error("Feedback not found");
	}
});

const UpdateFeedbackforAdmin = asyncHandler(async (req, res) => {
	const { isAdmin } = req.body;

	const feedback = await Feedback.findById(req.params.id);

	if (feedback) {
		feedback.isAdmin = isAdmin;

		const UpdatedFeedback = await feedback.save();
		res.json(UpdatedFeedback);
	} else {
		res.status(404);
		throw new Error("Feedback not found");
	}
});

const deleteFeedback = asyncHandler(async (req, res) => {
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
	updateFeedback,
	deleteFeedback,
	UpdateFeedbackforAdmin,
	getFeedbackforAdmin,
	getFeedbackforPatient,
};
