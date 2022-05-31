import { useHistory } from "react-router-dom";
import { Card, Button, Accordion, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { deleteQuestionforAdminAction, getQuestionForAdminAction } from "../../../actions/questionActions";
import MainScreen from "../../../components/MainScreen";
import "./questionList.css";
import swal from "sweetalert";

export default function QuestionViewforAdmin({ search }) {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;
	const getQuestionForAdmin = useSelector((state) => state.getQuestionForAdmin);
	const { loading, questions, error } = getQuestionForAdmin;

	const UpdateQuestionforAdmin = useSelector((state) => state.UpdateQuestionforAdmin);
	const { success: successUpdate } = UpdateQuestionforAdmin;

	const deleteQuestionforAdmin = useSelector((state) => state.deleteQuestionforAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteQuestionforAdmin;

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
					dispatch(deleteQuestionforAdminAction(id));
					swal({
						title: "Success!",
						text: "Deleted Question Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Question",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		if (!adminInfo) history.pushState("/");

		dispatch(getQuestionForAdminAction());
	}, [dispatch, history.pushState, adminInfo, successUpdate, successDelete, history]);

	if (adminInfo) {
		return (
			<div className="questionListAdmin">
				<MainScreen title="Patient Question List">
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

					<Button
						style={{
							float: "right",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/question-report"
					>
						{" "}
						Report
					</Button>
					<br></br>
					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{questions
						?.reverse()
						.filter((filteredB) => filteredB.email.includes(search))
						.map((question) => (
							<Accordion key={question._id}>
								<Card
									style={{
										margin: 10,
										left: "26%",
										width: "50%",
										borderRadius: 25,
									}}
									key={question._id}
								>
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
												Email : &emsp;
												{question.email}
											</Accordion.Toggle>
										</span>
										<div>
											<Button style={{ width: "70px" }} href={`/question-update-admin/${question._id}`}>
												Edit
											</Button>
										</div>
										&emsp;
										<div>
											<Button
												style={{ width: "70px" }}
												variant="danger"
												className="mx-2"
												onClick={() => deleteHandler(question._id)}
											>
												Delete
											</Button>
										</div>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Row>
												<Col>
													<h5>Name : {question.name}</h5>
													<h5>Question Type : {question.question_type}</h5>
													<h5>Question Description: {question.question_description}</h5>
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
