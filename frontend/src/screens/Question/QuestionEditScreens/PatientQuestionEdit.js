import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../actions/patientActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { updateQuestionAction } from "../../../actions/questionActions";
import MainScreen from "../../../components/MainScreen";
import "./questionEdit.css";

export default function PaitentQuestionEdit({ match, history }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [question_type, setQuestion_type] = useState("");
	const [question_description, setQuestion_description] = useState("");

	const dispatch = useDispatch();

	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;

	const updateQuestion = useSelector((state) => state.updateQuestion);
	const { loading, error } = updateQuestion;

	const deleteQuestion = useSelector((state) => state.deleteFeedback);
	const { loading: loadingDelete, error: errorDelete } = deleteQuestion;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/patient/question/view/${match.params.id}`, {
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
	if (patientInfo) {
		return (
			<div className="editQuestionPatient">
				<MainScreen title="Update Question">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/question-view-patient"
					>
						{" "}
						My Questions List
					</Button>
					<br></br>
					<br></br>
					<Card
						className="editqsPatients"
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
							className="editqsHeadPatients"
							style={{
								textAlign: "center",
								borderWidth: 2.0,
								margin: 10,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.9)",
								borderRadius: 20,
							}}
						>
							<h4 style={{ alignSelf: "center" }}>Update Question</h4>
						</Card.Header>

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
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										value={email}
										placeholder="Enter your Email"
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
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								{loading && <Loading size={50} />}
								<Button style={{ width: "30%" }} type="submit" variant="primary">
									Submit
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
