import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UpdateFeedbackforAdminAction } from "../../../actions/feedbackAction";
import { authHeader } from "../../../actions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import MainScreen from "../../../components/MainScreen";

export default function SingleFeedback({ match, history }) {
	const [isAdmin, setAdmin] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const UpdateFeedbackforAdmin = useSelector((state) => state.UpdateFeedbackforAdmin);
	const { loading, error } = UpdateFeedbackforAdmin;

	const deleteFeedbackforAdmin = useSelector((state) => state.deleteFeedbackforAdmin);
	const { loading: loadingDelete, error: errorDelete } = deleteFeedbackforAdmin;

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/admin/feedback/view/${match.params.id}`, {
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
	if (adminInfo) {
		return (
			<div className="editFeedbackAdmin">
				<MainScreen title="Visibility">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/feedback-adminview"
					>
						{" "}
						Patient Feedbacks List
					</Button>
					<br></br>
					<br></br>
					<Card
						className="editFeedbackAdmin"
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
							className="editfbHead"
							style={{
								textAlign: "center",
								borderWidth: 2.0,
								margin: 10,
								paddingInline: 10,
								background: "rgba(231, 238, 238, 0.9)",
								borderRadius: 20,
							}}
						>
							<h4 style={{ alignSelf: "center" }}>Visibility Update</h4>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
								<Form.Group controlId="name">
									<div className="form-group">
										<label className="feedbackVisibility">Visibility</label>
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
