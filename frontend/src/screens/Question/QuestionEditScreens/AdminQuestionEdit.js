import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authHeader } from "../../../actions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { UpdateQuestionforAdminAction } from "../../../actions/questionActions";

export default function AdminQuestionEdit({ match, history }) {
	const [isAdmin, setAdmin] = useState("");
	const [answer, setAnswer] = useState("");

	const dispatch = useDispatch();

	const UpdateQuestionforAdmin = useSelector((state) => state.UpdateQuestionforAdmin);
	const { loading, error } = UpdateQuestionforAdmin;

	const deleteQuestionforAdmin = useSelector((state) => state.deleteQuestionforAdmin);
	const { loading: loadingDelete, error: errorDelete } = deleteQuestionforAdmin;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`http://localhost:5000/user/admin/question/view/${match.params.id}`, {
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

	return (
		<div>
			<Card style={{ margin: 50, left: "30%", width: "40%" }}>
				<Card.Header>Answer For Question</Card.Header>
				<Card.Body>
					<Form onSubmit={updateHandler}>
						{loadingDelete && <Loading />}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
						<Form.Group controlId="isname">
							<Form.Label>Visibility</Form.Label>
							<Form.Control
								type="isAdmin"
								value={isAdmin}
								placeholder="Enter Visibility"
								onChange={(e) => setAdmin(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="answer">
							<Form.Label>Answer</Form.Label>
							<Form.Control
								type="answer"
								value={answer}
								placeholder="Enter Answer"
								onChange={(e) => setAnswer(e.target.value)}
							/>
						</Form.Group>

						{loading && <Loading size={50} />}
						<Button style={{ width: "30%" }} type="submit" variant="primary">
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
