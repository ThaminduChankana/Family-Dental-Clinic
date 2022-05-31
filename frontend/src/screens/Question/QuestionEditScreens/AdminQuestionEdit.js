import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../actions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { UpdateQuestionforAdminAction } from "../../../actions/questionActions";
import MainScreen from "../../../components/MainScreen";

export default function AdminQuestionEdit({ match, history }) {
	const [isAdmin, setAdmin] = useState("");
	const [answer, setAnswer] = useState("");

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const UpdateQuestionforAdmin = useSelector((state) => state.UpdateQuestionforAdmin);
	const { loading, error } = UpdateQuestionforAdmin;

	const deleteQuestionforAdmin = useSelector((state) => state.deleteQuestionforAdmin);
	const { loading: loadingDelete, error: errorDelete } = deleteQuestionforAdmin;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/admin/question/view/${match.params.id}`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});

			setAdmin(data.isAdmin);
			setAnswer(data.answer);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(UpdateQuestionforAdminAction(match.params.id, isAdmin, answer));
		if (!isAdmin || !answer) return;

		history.push("/question-adminview");
	};
	if (adminInfo) {
		return (
			<div className="editQuestionAdmin">
				<MainScreen title="Answers & Update Visibility">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/question-adminview"
					>
						{" "}
						Questions List
					</Button>
					<br></br>
					<br></br>
					<Card
						className="editqsPatients"
						style={{
							margin: 30,
							left: "25%",
							width: "45%",
							marginTop: 25,
							background: "rgba(231, 238, 238, 0.9)",
							borderColor: "rgb(0,0,0,0.0)",
							borderRadius: 25,
						}}
					>
						<Card.Header
							className="editqsHeadAdmin"
							style={{
								textAlign: "center",
								borderWidth: 2.0,
								margin: 10,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.9)",
								borderRadius: 20,
							}}
						>
							<h4 style={{ alignSelf: "center" }}>Answer & Update Visibility</h4>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
								<Form.Group controlId="isname">
									<div className="form-group">
										<label className="QuestionVisibility">Visibility</label>
										<select
											className="form-control"
											value={isAdmin}
											onChange={(e) => setAdmin(e.target.value)}
											required
										>
											<option value="true">True</option>
											<option value="false">False</option>
										</select>
									</div>
								</Form.Group>

								<Form.Group controlId="answer">
									<Form.Label>Answer</Form.Label>
									<Form.Control
										type="answer"
										value={answer}
										placeholder="Enter Answer"
										onChange={(e) => setAnswer(e.target.value)}
										style={{ background: "#f8f8ff" }}
									/>
								</Form.Group>

								{loading && <Loading size={50} />}
								<Button style={{ width: "30%" }} type="submit" variant="primary">
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
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
