import { createFeedbackAction } from "../../../actions/feedbackAction";
import { Button, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

export default function FeedbackCreate({ history }) {
	const [name, setName] = useState("");
	const [patient_email, setPatient_email] = useState("");
	const [review_description, setReview_description] = useState("");
	const [rating_count, setRating_count] = useState("");

	const dispatch = useDispatch();

	const createFeedback = useSelector((state) => state.createFeedback);
	const { loading, error, feedback } = createFeedback;

	console.log(feedback);

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
	useEffect(() => {}, []);
	return (
			<Card style={{ margin: 50, left: "30%", width: "40%", marginTop: 50 }}>
				<Card.Header>Create Feedback</Card.Header>
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
									required
									onChange={(e) => setName(e.target.value)}
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
								/>
							</Form.Group>

							<Form.Group controlId="rating">
								<Form.Label>Rating Count</Form.Label>

								<select
									style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#dfdfe1", borderWidth: 0.5 }}
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
						</Form>
					</Card.Body>
				</Card.Header>
			</Card>
		
	);
}
