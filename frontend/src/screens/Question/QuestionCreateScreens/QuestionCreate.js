import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createQuestionAction } from "../../../actions/questionActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import MainScreen from "../../../components/MainScreen";
import "./questionCreate.css";

export default function QuestionCreate({ history }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [question_type, setQuestion_type] = useState("");
	const [question_description, setQuestion_description] = useState("");

	const dispatch = useDispatch();
	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;

	const createQuestion = useSelector((state) => state.createQuestion);
	const { loading, error } = createQuestion;

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

	const demoHandler = async (e) => {
		e.preventDefault();
		setName("Test Patient 01");
		setEmail("test@gmail.com");
		setQuestion_type("General Dentistry FAQs");
		setQuestion_description("Is it healthy to drink cool drinks after nerve filling?");
	};
	useEffect(() => {}, []);
	if (patientInfo) {
		return (
			<div className="createQuestion">
				<MainScreen title="Ask Question">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/question-view-patient"
					>
						{" "}
						Question List
					</Button>
					<br></br>
					<br></br>
					<Card
						className="createqs"
						style={{
							margin: 30,
							left: "25%",
							width: "50%",
							marginTop: 25,
							background: "rgba(231, 238, 238, 0.9)",
							borderColor: "rgb(0,0,0,0.0)",
							borderRadius: 25,
						}}
					>
						<Card.Header
							className="createfbHead"
							style={{
								textAlign: "center",
								borderWidth: 2.0,
								margin: 10,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.9)",
								borderRadius: 20,
							}}
						>
							<h4 style={{ alignSelf: "center" }}>Ask New Question</h4>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="name"
										value={name}
										placeholder="Enter your Name"
										required
										onChange={(e) => setName(e.target.value)}
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										value={email}
										placeholder="Enter your Email"
										required
										onChange={(e) => setEmail(e.target.value)}
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								<Form.Group controlId="question_type">
									<Form.Label>Question type</Form.Label>

									<select
										style={{
											height: "35px",
											width: "100%",
											textColor: "#d3d3d3",
											borderColor: "#f5f5f5",
											background: "#f8f8ff",
											borderWidth: 0.5,
											borderRadius: 5,
										}}
										onChange={(e) => setQuestion_type(e.target.value)}
									>
										<option>Select Question Type</option>
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
										required
										onChange={(e) => setQuestion_description(e.target.value)}
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button type="submit" variant="primary" style={{ marginTop: 16 }}>
									Submit
								</Button>
								<Button className="mx-2" onClick={resetHandler} variant="danger" style={{ marginTop: 16 }}>
									Reset
								</Button>
								<Button
									variant="info"
									onClick={demoHandler}
									style={{
										marginTop: 16,
									}}
								>
									Demo
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</MainScreen>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
}
