import { useHistory } from "react-router-dom";
import { Card, Button, Accordion, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { deleteQuestionforAdminAction, getQuestionForAdminAction } from "../../../actions/questionActions";

export default function QuestionViewforAdmin() {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;
	const getQuestionForAdmin = useSelector((state) => state.getQuestionForAdmin);
	const { loading, questions, error } = getQuestionForAdmin;

	const UpdateQuestionforAdmin = useSelector((state) => state.UpdateQuestionforAdmin);
	const { success: successUpdate } = UpdateQuestionforAdmin;

	const deleteQuestionforAdmin = useSelector((state) => state.deleteQuestionforAdmin);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = deleteQuestionforAdmin;
	console.log(questions);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteQuestionforAdminAction(id));
		}
	};
	const history = useHistory();
	useEffect(() => {
		if (!adminInfo) history.pushState("/");

		dispatch(getQuestionForAdminAction());
	}, [dispatch, history.pushState, adminInfo, successUpdate, successDelete, history]);

	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{questions?.map((question) => (
				<Accordion>
					<Card
						style={{
							margin: 10,
							left: "30%",
							width: "40%",
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
		</div>
	);
}
