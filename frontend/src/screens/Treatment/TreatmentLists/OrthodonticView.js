import { useHistory, Link } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrthodonticAction, listOrthodontics } from "../../../actions/orthodonticAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";
import MainScreen from "../../../components/MainScreen";
import swal from "sweetalert";

function OrthodonticView({ search }) {
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
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteOrthodonticAction(id));
					swal({
						title: "Success!",
						text: "Deleted Orthodontic Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/treatment-orthodontic-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Orthodotic",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listOrthodontics());
	}, [dispatch, history, doctorInfo, successUpdate, successDelete]);

	if (doctorInfo) {
		return (
			<div style={{ minHeight: 700, backgroundColor: "#a4dded" }}>
				<MainScreen title={`Welcome Back ${doctorInfo && doctorInfo.name}..`}>
					<br />
					<TreatmentNavBar />
					<br></br>
					<br></br>
					<br></br>
					<Row>
						<Col>
							<h1 style={{ marginLeft: 10 }}>Orthodontic Treatment List</h1>
						</Col>
						<Col>
							<Link to="/treatment-orthodontic-create">
								<Button style={{ float: "right", marginRight: 10 }} size="lg">
									+ Create New Orthodontic
								</Button>
							</Link>
						</Col>
					</Row>
					<br />
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{orthodontics
						?.reverse()
						.filter((filtered) => filtered.nic.includes(search))
						.map((orthodontic) => (
							<Accordion key={orthodontic._id}>
								<Card
									style={{
										borderRadius: 25,
										borderWidth: 1.0,
										borderColor: "rgb(0,0,0,0.5)",
										marginTop: 20,
										paddingInline: 10,
										background: "rgb(235, 235, 235)",
									}}
								>
									<Card.Header
										style={{
											display: "flex",
											paddingInline: 10,
											borderRadius: 25,
											marginTop: 10,
											marginBottom: 10,
											borderColor: "black",
											background: "rgba(255, 255, 255)",
										}}
									>
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
												&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; Date : {orthodontic.firstVisit}
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
					<br></br>
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
export default OrthodonticView;
