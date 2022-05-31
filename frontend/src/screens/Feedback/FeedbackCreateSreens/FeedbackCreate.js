import { createFeedbackAction } from "../../../actions/feedbackAction";
import { Button, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";
import "./feedbackCreate.css";

export default function FeedbackCreate({ history }) {
	const [name, setName] = useState("");
	const [patient_email, setPatient_email] = useState("");
	const [review_description, setReview_description] = useState("");
	const [rating_count, setRating_count] = useState("");

	const dispatch = useDispatch();

	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;

	const createFeedback = useSelector((state) => state.createFeedback);
	const { loading, error } = createFeedback;

	const resetHandler = () => {
		setName("");
		setPatient_email("");
		setReview_description("");
		setRating_count("");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!name || !patient_email || !review_description || !rating_count) return;
		dispatch(createFeedbackAction(name, patient_email, review_description, rating_count));

		resetHandler();
		history.push("/feedback-view-patient");
	};

	const demoHandler = async (e) => {
		e.preventDefault();
		setName("Test Patient 01");
		setPatient_email("test1@gmail.com");
		setReview_description("good");
		setRating_count("4");
	};

	useEffect(() => {}, []);
	if (patientInfo) {
		return (
			<div className="createFeedback">
				<MainScreen title="Create Feedback">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/feedback-view-patient"
					>
						{" "}
						Feedback List
					</Button>
					<br></br>
					<br></br>
					<Card
						className="createfb"
						style={{
							margin: 30,
							left: "25%",
							width: "45%",
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
							<h4 style={{ alignSelf: "center" }}>Create New Feedback</h4>
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

								<Form.Group controlId="patient_email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="patient_email"
										value={patient_email}
										placeholder="Enter your Email"
										required
										onChange={(e) => setPatient_email(e.target.value)}
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								<Form.Group controlId="review_description">
									<Form.Label>Review Description</Form.Label>

									<Form.Control
										as="textarea"
										type="review_description"
										value={review_description}
										placeholder="Enter your Review Description"
										required
										onChange={(e) => setReview_description(e.target.value)}
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								<Form.Group controlId="rating">
									<Form.Label>Rating Count</Form.Label>

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
										onChange={(e) => setRating_count(e.target.value)}
									>
										<option>Select Rating Count</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</select>
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
