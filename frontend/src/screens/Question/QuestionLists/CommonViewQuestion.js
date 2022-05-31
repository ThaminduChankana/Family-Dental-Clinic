import { Accordion, Card, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { getQuestionCommonQAPageAction } from "../../../actions/questionActions";
import "./questionList.css";
import MainScreen from "../../../components/MainScreen";

export default function CommonViewQuestion({ search }) {
	const dispatch = useDispatch();

	const getQuestionCommonQAPage = useSelector((state) => state.getQuestionCommonQAPage);
	const { loading, questions, error } = getQuestionCommonQAPage;

	useEffect(() => {
		dispatch(getQuestionCommonQAPageAction());
	}, [dispatch]);
	return (
		<div className="commonViewQuestion">
			<MainScreen title="FAQ">
				<div style={{ padding: "2rem" }}>
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{questions
						?.reverse()
						.filter((filteredB) => filteredB.email.includes(search))
						.map((question) => (
							<Accordion key={question._id}>
								<Card style={{ margin: 10, left: "20%", width: "60%", borderRadius: 25 }} key={question._id}>
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
												Question Type : &emsp;
												{question.question_type}
											</Accordion.Toggle>
										</span>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Row>
												<Col md={20}>
													<h5>Question Description: {question.question_description}</h5>
													<h5>Answer : {question.answer}</h5>
													<h5>Name: {question.name}</h5>
													<h5>Email: {question.email}</h5>
												</Col>
											</Row>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						))}
				</div>
			</MainScreen>
		</div>
	);
}
