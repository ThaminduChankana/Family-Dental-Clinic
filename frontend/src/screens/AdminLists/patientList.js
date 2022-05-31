import React, { useEffect } from "react";
import { Accordion, Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { patientDeleteProfile, patientsList } from "../../actions/patientActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../AdminLists/lists.css";
import swal from "sweetalert";

const PatientListForAdmin = ({ search }) => {
	const dispatch = useDispatch();

	const patientList = useSelector((state) => state.patientList);
	const { loading, patients, error } = patientList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const patientUpdate = useSelector((state) => state.patientUpdate);
	const { success: successUpdate } = patientUpdate;

	const patientDelete = useSelector((state) => state.patientDelete);
	const { success: successDelete } = patientDelete;

	const history = useHistory();

	useEffect(() => {
		dispatch(patientsList());
		if (!adminInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, adminInfo, patientDelete, successDelete, successUpdate]);

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
					dispatch(patientDeleteProfile(id));
					swal({
						title: "Success!",
						text: "Deleted Account Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Account",
					type: "error",
				});
			});
	};
	if (adminInfo) {
		return (
			<div className="patientList">
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<h1
						style={{
							display: "flex",
							marginLeft: "10px",
							width: "500px",
						}}
					>
						Patients List
					</h1>
					<br></br>
					<ButtonGroup className="mb-2" size="lg" style={{ width: "100%" }}>
						<Button href="/admin">Back to operations page</Button>

						<Button href="/patient-register">+ Create New Patient Account</Button>

						<Button href="/admin-patient-report">Patient Registrations Report</Button>
					</ButtonGroup>

					<br></br>

					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					<br></br>
					{patients &&
						patients
							.filter(
								(filteredPatients) =>
									filteredPatients.name.toLowerCase().includes(search.toLowerCase()) ||
									filteredPatients.nic.includes(search)
							)
							.reverse()
							.map((patientList) => (
								<div key={patientList._id} className="listContainer">
									<Accordion>
										<Card
											style={{
												margin: 10,
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
														<label className="nic" style={{ paddingInline: 20, marginTop: 10 }}>
															Patient NIC : &emsp;
															{patientList.nic}{" "}
														</label>{" "}
														<br></br>
														<label className="name" style={{ paddingInline: 20 }}>
															Patient Name : &emsp;
															{patientList.name}
														</label>
													</Accordion.Toggle>
												</span>
												<div>
													<Button
														style={{ marginTop: 20, fontSize: 15 }}
														href={`/admin-patient-edit/${patientList._id}`}
													>
														Edit
													</Button>
												</div>
												&emsp;
												<div>
													<Button
														style={{ marginTop: 20, fontSize: 15 }}
														variant="danger"
														className="mx-2"
														onClick={() => deleteHandler(patientList._id)}
													>
														Delete
													</Button>
												</div>
											</Card.Header>
											<Accordion.Collapse eventKey="0">
												<Card.Body>
													<Row>
														<Col md={6}>
															<h5>Name - {patientList.name}</h5>
															<h5>Date of Birth - {patientList.dob}</h5>
															<h5>Gender - {patientList.gender}</h5>
															<h5>NIC - {patientList.nic}</h5>
															<h5>Telephone - {patientList.telephone}</h5>
															<h5>Address - {patientList.address}</h5>
															<h5>Email - {patientList.email}</h5>
															<h5>Referring Doctor - {patientList.referringDoctor}</h5>
															<h5>Data Entry By - {patientList.dataEntry}</h5>
															<h5>Registered Date - {patientList.regDate}</h5>
															<br></br>
														</Col>
														<Col
															style={{
																display: "flex",
																alignItems: "center",
																width: "500px",
																justifyContent: "center",
															}}
														>
															<img src={patientList.pic} alt={patientList.name} className="profilePic" />
														</Col>
													</Row>

													<blockquote className="blockquote mb-0">
														<Card.Footer className="text-muted" style={{ borderRadius: 20, background: "white" }}>
															Created on -<cite title="Source Title"> {patientList.createdAt.substring(0, 10)}</cite>
														</Card.Footer>
													</blockquote>
												</Card.Body>
											</Accordion.Collapse>
										</Card>
									</Accordion>
								</div>
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
};

export default PatientListForAdmin;
