import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestionAction, getQuestionAction } from "../../../actions/questionActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";

export default function QuestionViewforPatient() {
	const dispatch = useDispatch();
	const patient_Login = useSelector((state) => state.patient_Login);

	const { patientInfo } = patient_Login;
	const getQuestion = useSelector((state) => state.getQuestion);
	const { loading, questions, error } = getQuestion;

	const updateQuestion = useSelector((state) => state.updateQuestion);
	const { success: successUpdate } = updateQuestion;

	const deleteQuestion = useSelector((state) => state.deleteQuestion);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteQuestion;

	console.log(questions);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteQuestionAction(id));
		}
	};

	console.log(questions);
	const history = useHistory();
	useEffect(() => {
		if (!patientInfo) history.pushState("/");
		dispatch(getQuestionAction());
	}, [dispatch, history.pushState, patientInfo, successUpdate, successDelete, history]);
	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{questions?.map((question) => (
				<Accordion>
					<Card style={{ margin: 10, left: "30%", width: "40%" }} key={question._id}>
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
		</div>
	);
}
