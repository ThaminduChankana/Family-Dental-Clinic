const asyncHandler = require("express-async-handler");
const Question = require("../models/questionModel");

const getQuestionForAdmin = asyncHandler(async (req, res) => {
	const question = await Question.find();
	res.json(question);
});

const getQuestion = asyncHandler(async (req, res) => {
	const question = await Question.find({ isAdmin: true });
	console.log(question);
	res.json(question);
});

const createQuestion = asyncHandler(async (req, res) => {
	const { name, email, question_type, question_description } = req.body;

	if (!name || !email || !question_type || !question_description) {
		res.status(400);
		throw new Error("Please Fill all the fields");
	} else {
		const question = new Question({
			name,
			email,
			question_type,
			question_description,
		});

		const createdQuestion = await question.save();

		res.status(201).json(createdQuestion);
	}
});

const getQuestionById = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);

	if (question) {
		res.json(question);
	} else {
		res.status(404).json({ message: "Question not found" });
	}
});

const updateQuestion = asyncHandler(async (req, res) => {
	const { name, email, question_type, question_description } = req.body;

	const question = await Question.findById(req.params.id);

	if (question) {
		question.name = name;
		question.email = email;
		question.question_type = question_type;
		question.question_description = question_description;

		const UpdatedQuestion = await question.save();
		res.json(UpdatedQuestion);
	} else {
		res.status(404);
		throw new Error("Question not found");
	}
});

const UpdateQuestionforAdmin = asyncHandler(async (req, res) => {
	const { isAdmin, answer } = req.body;

	const question = await Question.findById(req.params.id);

	if (question) {
		question.isAdmin = isAdmin;
		question.answer = answer;

		const UpdatedQuestion = await question.save();
		res.json(UpdatedQuestion);
	} else {
		res.status(404);
		throw new Error("Question not found");
	}
});

const deleteQuestion = asyncHandler(async (req, res) => {
	const question = await Question.findById(req.params.id);

	if (question) {
		await question.remove();
		res.json({ message: "Question Removed" });
	} else {
		res.status(404);
		throw new Error("Question not Found");
	}
});

module.exports = {
	getQuestion,
	createQuestion,
	getQuestionById,
	updateQuestion,
	deleteQuestion,
	UpdateQuestionforAdmin,
	getQuestionForAdmin,
};
