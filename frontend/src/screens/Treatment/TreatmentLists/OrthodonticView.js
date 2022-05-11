import { useHistory } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrthodonticAction, listOrthodontics } from "../../../actions/orthodonticAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";

function OrthodonticView() {
	const dispatch = useDispatch();
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;
	const orthodonticList = useSelector((state) => state.orthodonticList);
	const { loading, orthodontics, error } = orthodonticList;

	const orthodonticUpdate = useSelector((state) => state.orthodonticUpdate);
	const { success: successUpdate } = orthodonticUpdate;

	const orthodonticDelete = useSelector((state) => state.orthodonticDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = orthodonticDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteOrthodonticAction(id));
		}
	};

	const history = useHistory();
	useEffect(() => {
		if (!doctorInfo) history.pushState("/");
		dispatch(listOrthodontics());
	}, [dispatch, history.push, doctorInfo, successUpdate, successDelete]);

	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{orthodontics?.map((orthodontic) => (
				<Accordion>
					<Card style={{ margin: 10, left: "30%", width: "40%" }} key={orthodontic._id}>
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
									NIC : &emsp;
									{orthodontic.nic}
								</Accordion.Toggle>
							</span>
							<div>
								<Button style={{ width: "70px" }} href={`/orthodontic/${orthodontic._id}`}>
									Edit
								</Button>
							</div>
							&emsp;
							<div>
								<Button
									style={{ width: "70px" }}
									variant="danger"
									className="mx-2"
									onClick={() => deleteHandler(orthodontic._id)}
								>
									Delete
								</Button>
							</div>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<Row>
									<Col md={20}>
										<h5>First Visit Date : {orthodontic.firstVisit}</h5>
										<h5>Full Cost : {orthodontic.fullCost}</h5>
										<h5>Paid : {orthodontic.paid}</h5>
										<h5>Facial Examination : {orthodontic.facialExamination}</h5>
										<h5>Follow Up Visits : {orthodontic.followUpVisits}</h5>
										<h5>Remark : {orthodontic.remark}</h5>
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
export default OrthodonticView;
