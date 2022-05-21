import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../actions/patientActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { updateFeedbackAction } from "../../../actions/feedbackAction";

export default function PaitentFeedbackEdit({ match, history }) {
	const [name, setName] = useState("");
	const [patient_email, setPatient_email] = useState("");
	const [review_description, setReview_description] = useState("");
	const [rating_count, setRating_count] = useState("");

	const dispatch = useDispatch();

	const updateFeedback = useSelector((state) => state.updateFeedback);
	const { loading, error } = updateFeedback;

	const deleteFeedback = useSelector((state) => state.deleteFeedback);
	const { loading: loadingDelete, error: errorDelete } = deleteFeedback;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`http://localhost:5000/user/patient/feedback/view/${match.params.id}`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});

			setName(data.name);
			setPatient_email(data.patient_email);
			setReview_description(data.review_description);
			setRating_count(data.rating_count);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateFeedbackAction(match.params.id, name, patient_email, review_description, rating_count));
		if (!name || !patient_email || !review_description || !rating_count) return;

		history.push("/feedback-view-patient");
	};

	return (
		<Card style={{ margin: 50, left: "30%", width: "40%", marginTop: 50 }}>
			<Card.Header>Update Feedback</Card.Header>
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

						<Form.Group controlId="patient_email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="patient_email"
								value={patient_email}
								placeholder="Enter your Email"
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
								onChange={(e) => setReview_description(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="rating">
							<Form.Label>Rating Count</Form.Label>

							<select
								style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#dfdfe1", borderWidth: 0.5 }}
								onChange={(e) => setRating_count(e.target.value)}
							>
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5">5</option>
							</select>
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
