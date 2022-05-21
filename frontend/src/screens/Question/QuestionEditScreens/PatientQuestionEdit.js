import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../actions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { updateQuestionAction } from "../../../actions/questionActions";

export default function PaitentQuestionEdit({ match, history }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [question_type, setQuestion_type] = useState("");
	const [question_description, setQuestion_description] = useState("");

	const dispatch = useDispatch();

	const updateQuestion = useSelector((state) => state.updateQuestion);
	const { loading, error } = updateQuestion;

	const deleteQuestion = useSelector((state) => state.deleteFeedback);
	const { loading: loadingDelete, error: errorDelete } = deleteQuestion;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`http://localhost:5000/user/patient/question/view/${match.params.id}`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});

			setName(data.name);
			setEmail(data.email);
			setQuestion_type(data.question_type);
			setQuestion_description(data.question_description);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateQuestionAction(match.params.id, name, email, question_type, question_description));
		if (!name || !email || !question_type || !question_description) return;

		history.push("/question-view-patient");
	};

	return (
		<Card style={{ margin: 50, left: "30%", width: "40%", marginTop: 50 }}>
			<Card.Header>Update Question</Card.Header>
			<Card.Header>
				<Card.Body>
					<Form onSubmit={updateHandler}>
						{loadingDelete && <Loading />}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
						<Button style={{ width: "30%" }} type="submit" variant="primary">
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card.Header>
		</Card>
	);
}
