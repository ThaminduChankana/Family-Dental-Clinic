import { useHistory } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { deleteFeedbackforAdminAction, getFeedbackforAdminAction } from "../../../actions/feedbackAction";

export default function FeedbackViewforAdmin() {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;
	const getFeedbackforAdmin = useSelector((state) => state.getFeedbackforAdmin);
	const { loading, feedbacks, error } = getFeedbackforAdmin;

	const UpdateFeedbackforAdmin = useSelector((state) => state.UpdateFeedbackforAdmin);
	const { success: successUpdate } = UpdateFeedbackforAdmin;

	const deleteFeedbackforAdmin = useSelector((state) => state.deleteFeedbackforAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteFeedbackforAdmin;
	console.log(feedbacks);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteFeedbackforAdminAction(id));
		}
	};

	const history = useHistory();
	useEffect(() => {
		if (!adminInfo) history.pushState("/");

		dispatch(getFeedbackforAdminAction());
	}, [dispatch, history.pushState, adminInfo, successUpdate, successDelete, history]);
	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{feedbacks?.map((feedback) => (
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
								<Button style={{ width: "70px" }} href={`/feedback-update-admin/${feedback._id}`}>
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
									<Col>
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
