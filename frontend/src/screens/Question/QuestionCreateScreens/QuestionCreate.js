import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionAction } from "../../../actions/questionActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";

export default function QuestionCreate({ history }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [question_type, setQuestion_type] = useState("");
	const [question_description, setQuestion_description] = useState("");

	const dispatch = useDispatch();

	const createQuestion = useSelector((state) => state.createQuestion);
	const { loading, error, question } = createQuestion;

	console.log(question);

	const resetHandler = () => {
		setName("");
		setEmail("");
		setQuestion_type("");
		setQuestion_description("");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!name || !email || !question_type || !question_description) return;
		dispatch(createQuestionAction(name, email, question_type, question_description));

		resetHandler();
		history.push("/feedback-dashboard");
	};
	useEffect(() => {}, []);
	return (
		<div>
			<div class="topicDiv" style={{ marginLeft: 580, marginTop: 50, fontFamily: "monospace", color: "#4e4e4f" }}>
				<h1>ASK A QUESTION</h1>
			</div>
			<Card style={{ margin: 50, left: "30%", width: "40%", marginTop: 50 }}>
				<Card.Header>
					<Card.Body>
						<Form onSubmit={submitHandler}>
							{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
							<Form.Group controlId="name">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="name"
									value={name}
									placeholder="Enter your Name"
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									value={email}
									placeholder="Enter your Email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="question_type">
								<Form.Label>Question type</Form.Label>

								<select
									style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#dfdfe1", borderWidth: 0.5 }}
									onChange={(e) => setQuestion_type(e.target.value)}
								>
									<option></option>
									<option value="General Dentistry FAQs">General Dentistry FAQs</option>
									<option value="Appointments FAQs">Appointments FAQs</option>
								</select>
							</Form.Group>

							<Form.Group controlId="question_description">
								<Form.Label>Question Description</Form.Label>
								<Form.Control
									as="textarea"
									type="question_description"
									value={question_description}
									placeholder="Enter your Question Description"
									onChange={(e) => setQuestion_description(e.target.value)}
								/>
							</Form.Group>
							{loading && <Loading size={50} />}
							<Button type="submit" variant="primary" style={{ marginTop: 16 }}>
								Submit
							</Button>
							<Button className="mx-2" onClick={resetHandler} variant="danger" style={{ marginTop: 16 }}>
								Reset
							</Button>
						</Form>
					</Card.Body>
				</Card.Header>
			</Card>
		</div>
	);
}
