import { useHistory } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { deleteFeedbackAction, getFeedbackAction } from "../../../actions/feedbackAction";

export default function FeedbackViewforPatient({search}) {
	const dispatch = useDispatch();
	const patient_Login = useSelector((state) => state.patient_Login);

	const { patientInfo } = patient_Login;
	const getFeedback = useSelector((state) => state.getFeedback);
	const { loading, feedbacks, error } = getFeedback;

	const updateFeedback = useSelector((state) => state.updateFeedback);
	const { success: successUpdate } = updateFeedback;

	const deleteFeedback = useSelector((state) => state.deleteFeedback);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteFeedback;
	console.log(feedbacks);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteFeedbackAction(id));
		}
	};
	console.log(feedbacks);
	const history = useHistory();
	useEffect(() => {
		if (!patientInfo) history.pushState("/");
		dispatch(getFeedbackAction());
	}, [dispatch, history.pushState, patientInfo, successUpdate, successDelete, history]);
	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{feedbacks
				?.reverse()
				.filter((filteredB) => filteredB.rating_count.includes(search))
				.map((feedback) => (
					<Accordion>
						<Card style={{ margin: 10, left: "30%", width: "40%" }} key={feedback._id}>
							<Card.Header style={{ display: "flex" }}>
								<span
									style={{
										color: "black",
										textDecoration: "none",
										flex: 1,
										cursor: "pointer",
										alignSelf: "center",
										fontSize: 18,
									}}
								>
									<Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
										Patient Email : &emsp;
										{feedback.patient_email}
									</Accordion.Toggle>
								</span>
								<div>
									<Button style={{ width: "70px" }} href={`/feedback-update-patient/${feedback._id}`}>
										Edit
									</Button>
								</div>
								&emsp;
								<div>
									<Button
										style={{ width: "70px" }}
										variant="danger"
										className="mx-2"
										onClick={() => deleteHandler(feedback._id)}
									>
										Delete
									</Button>
								</div>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<Row>
										<Col md={20}>
											<h5>Name: {feedback.name}</h5>
											<h5>Review Description : {feedback.review_description}</h5>
											<h5>Rating Count: {feedback.rating_count}</h5>
										</Col>
									</Row>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				))}
		</div>
	);
}
