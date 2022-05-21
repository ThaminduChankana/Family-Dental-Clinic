import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  UpdateFeedbackforAdminAction } from "../../../actions/feedbackAction";
import { authHeader } from "../../../actions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

export default function SingleFeedback({ match, history }) {
	const [isAdmin, setAdmin] = useState("");

	const dispatch = useDispatch();

	const UpdateFeedbackforAdmin = useSelector((state) => state.UpdateFeedbackforAdmin);
	const { loading, error } = UpdateFeedbackforAdmin;

	const deleteFeedbackforAdmin = useSelector((state) => state.deleteFeedbackforAdmin);
	const { loading: loadingDelete, error: errorDelete } = deleteFeedbackforAdmin;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`http://localhost:5000/user/admin/feedback/view/${match.params.id}`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});

			setAdmin(data.isAdmin);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(UpdateFeedbackforAdminAction(match.params.id, isAdmin));
		if (!isAdmin) return;

		history.push("/feedback-adminview");
	};

	return (
		<div>
			<Card style={{ margin: 50, left: "30%", width: "40%" }}>
				<Card.Header>Update Feedback</Card.Header>
				<Card.Body>
					<Form onSubmit={updateHandler}>
						{loadingDelete && <Loading />}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
						<Form.Group controlId="name">
							<Form.Label>Visibility</Form.Label>
							<Form.Control
								type="isAdmin"
								value={isAdmin}
								placeholder="Enter Visibility"
								onChange={(e) => setAdmin(e.target.value)}
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
