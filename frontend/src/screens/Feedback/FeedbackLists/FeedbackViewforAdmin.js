import { useHistory } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { deleteFeedbackforAdminAction, getFeedbackforAdminAction } from "../../../actions/feedbackAction";
import MainScreen from "../../../components/MainScreen";
import "./feedbackList.css";
import swal from "sweetalert";

export default function FeedbackViewforAdmin({ search }) {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;
	const getFeedbackforAdmin = useSelector((state) => state.getFeedbackforAdmin);
	const { loading, feedbacks, error } = getFeedbackforAdmin;

	const UpdateFeedbackforAdmin = useSelector((state) => state.UpdateFeedbackforAdmin);
	const { success: successUpdate } = UpdateFeedbackforAdmin;

	const deleteFeedbackforAdmin = useSelector((state) => state.deleteFeedbackforAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteFeedbackforAdmin;

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteFeedbackforAdminAction(id));
					swal({
						title: "Success!",
						text: "Deleted Feedback Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Feedback",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		if (!adminInfo) history.pushState("/admin-feedback-Q&A");

		dispatch(getFeedbackforAdminAction());
	}, [dispatch, history.pushState, adminInfo, successUpdate, successDelete, history]);

	if (adminInfo) {
		return (
			<div className="feedbackListAdmin">
				<MainScreen title="Patient Feedback List">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-feedback-Q&A"
					>
						{" "}
						Back To Feeedback Q&A Page
					</Button>
					<br></br>
					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{feedbacks
						?.reverse()
						.filter((filteredB) => filteredB.patient_email.includes(search))
						.map((feedback) => (
							<Accordion key={feedback._id}>
								<Card style={{ margin: 10, left: "25%", width: "50%", borderRadius: 25 }} key={feedback._id}>
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
													<h5>
														<b>Name :- </b> <br></br>&emsp;{feedback.name}
													</h5>
													<br></br>
													<h5>
														<b>Review Description :- </b> <br></br> &emsp;{feedback.review_description}
													</h5>
													<br></br>
													<h5>
														<b>Rating Count :- </b> {feedback.rating_count} / 5
													</h5>
												</Col>
											</Row>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						))}
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
