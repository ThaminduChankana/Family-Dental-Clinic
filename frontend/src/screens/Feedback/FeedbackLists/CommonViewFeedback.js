import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { Grid } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { getFeedbackCommonReviewPageAction } from "../../../actions/feedbackAction";
import "./feedbackList.css";
import MainScreen from "../../../components/MainScreen";

export default function CommonViewFeedback({ search }) {
	const dispatch = useDispatch();

	const getFeedbackCommonReviewPage = useSelector((state) => state.getFeedbackCommonReviewPage);
	const { loading, feedbacks, error } = getFeedbackCommonReviewPage;

	useEffect(() => {
		dispatch(getFeedbackCommonReviewPageAction());
	}, [dispatch]);
	return (
		<div className="commonViewFeedback">
			<MainScreen title="Feedback">
				<div style={{ padding: "1rem" }}>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{feedbacks
						?.reverse()
						.filter((filteredB) => filteredB.patient_email.includes(search))
						.map((feedback) => (
							<Grid
								item
								xs={12}
								sm={9}
								md={4}
								key={feedbacks.indexOf(feedback)}
								style={{
									display: "inline-flex",
									width: "600px",
									borderRadius: 25,
								}}
							>
								<Card
									style={{
										width: "30rem",
										margin: 20,
										borderRadius: 25,
									}}
									key="0"
								>
									<Card.Header
										className="commonfbHead"
										style={{
											textAlign: "center",
											borderWidth: 1.0,
											borderTopRightRadius: 25,
											borderTopLeftRadius: 25,
										}}
									>
										<h2>{feedback.name}</h2>
									</Card.Header>
									<Card.Body>
										<h5>{feedback.review_description}</h5>
										<br></br>
										<h5>
											<b>Rating Count:- {feedback.rating_count} / 5</b>
										</h5>
									</Card.Body>
								</Card>
							</Grid>
						))}
				</div>
			</MainScreen>
		</div>
	);
}
