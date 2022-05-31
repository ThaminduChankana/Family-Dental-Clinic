import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestionAction, getQuestionAction } from "../../../actions/questionActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import "./questionList.css";
import MainScreen from "../../../components/MainScreen";
import swal from "sweetalert";

export default function QuestionViewforPatient({ search }) {
	const dispatch = useDispatch();
	const patient_Login = useSelector((state) => state.patient_Login);

	const { patientInfo } = patient_Login;
	const getQuestion = useSelector((state) => state.getQuestion);
	const { loading, questions, error } = getQuestion;

	const updateQuestion = useSelector((state) => state.updateQuestion);
	const { success: successUpdate } = updateQuestion;

	const deleteQuestion = useSelector((state) => state.deleteQuestion);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteQuestion;

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
					dispatch(deleteQuestionAction(id));
					swal({
						title: "Success!",
						text: "Question Deleted Successfully",
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
		if (!patientInfo) history.pushState("/");
		dispatch(getQuestionAction());
	}, [dispatch, history.pushState, patientInfo, successUpdate, successDelete, history]);

	if (patientInfo) {
		return (
			<div className="questionListPatient">
				<MainScreen title="My Question List">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/question-create"
					>
						{" "}
						Ask A New Question
					</Button>
					<br></br>
					<br></br>
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{questions
						?.reverse()
						.filter((filteredB) => filteredB.question_type.includes(search))
						.map((question) => (
							<Accordion key={question._id}>
								<Card style={{ margin: 10, left: "25%", width: "50%", borderRadius: 25 }} key={question._id}>
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
											<Button style={{ width: "70px" }} href={`/question-update-patient/${question._id}`}>
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
												<Col md={20}>
													<h5>Name: {question.name}</h5>
													<h5>Question Type : {question.question_type}</h5>
													<h5>Question Description: {question.question_description}</h5>
													<h5>Answer : {question.answer}</h5>
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
