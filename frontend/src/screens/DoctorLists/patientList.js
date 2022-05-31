import React, { useEffect } from "react";
import { Accordion, Button, Card, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { patientsListForDoctor } from "../../actions/patientActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./doctorLists.css";

const PatientListForDoctor = ({ search }) => {
	const dispatch = useDispatch();

	const patientListForDoctor = useSelector((state) => state.patientListForDoctor);
	const { loading, patients, error } = patientListForDoctor;

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const history = useHistory();

	useEffect(() => {
		dispatch(patientsListForDoctor());
		if (!doctorInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, doctorInfo]);
	if (doctorInfo) {
		return (
			<div className="doctorPatientList">
				<MainScreen title={`Welcome Back ${doctorInfo && doctorInfo.name}..`}>
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

					<div>
						<Col>
							<Link to="/doctor">
								<Button style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }} size="lg">
									Back to operations page
								</Button>
							</Link>
						</Col>
					</div>
					<br></br>

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
														<label className="nic" style={{ paddingInline: 20 }}>
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

export default PatientListForDoctor;
