import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { Grid } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { getFeedbackCommonReviewPageAction } from "../../../actions/feedbackAction";

export default function CommonViewFeedback() {
	const dispatch = useDispatch();

	const getFeedbackCommonReviewPage = useSelector((state) => state.getFeedbackCommonReviewPage);
	const { loading, feedbacks, error } = getFeedbackCommonReviewPage;

	console.log(feedbacks);
	useEffect(() => {
		dispatch(getFeedbackCommonReviewPageAction());
	}, [dispatch]);
	return (
		<div>
			<Card.Header>
				<h3 style={{ color: "darkgray" }}>Feedback</h3>
				<div class="align-right"></div>
			</Card.Header>
			<div style={{ padding: "2rem" }}>
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				{feedbacks?.map((feedback) => (
					<Grid item xs={12} sm={6} md={3} key={feedbacks.indexOf(feedback)}>
						<Card style={{ width: "20rem", height: "22rem", margin: 25, left: "10%" }} key="0">
							<Card.Header>
								<h2> Patient name : {feedback.name}</h2>
							</Card.Header>
							<Card.Body>
								<h5>Patient Emai : {feedback.patient_email}</h5>
								<h5>Review Description : {feedback.review_description}</h5>
								<h5>Rating Count: {feedback.rating_count}</h5>
							</Card.Body>
						</Card>
					</Grid>
				))}
			</div>
		</div>
	);
}
