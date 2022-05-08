import React, { useEffect } from "react";
import { Accordion, Button, Card, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { patientDeleteProfile, patientsList } from "../../actions/patientActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const PatientListForAdmin = () => {
	const dispatch = useDispatch();

	const patientList = useSelector((state) => state.patientList);
	const { loading, patients, error } = patientList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const patientUpdate = useSelector((state) => state.patientUpdate);
	const { success: successUpdate } = patientUpdate;

	const patientDelete = useSelector((state) => state.patientDelete);
	const { error: errorDelete, success: successDelete } = patientDelete;

	console.log(patients);
	const history = useHistory();

	useEffect(() => {
		//Function or React hook that is fired off whenever a component is rendered, as soon as pages are rendered the api is called
		dispatch(patientsList());
		if (!adminInfo) {
			history.push("/");
		}
	}, [dispatch, history, adminInfo, patientDelete, successDelete, successUpdate]);

	const deleteHandler = (id) => {
		if (window.confirm("Are You Sure?")) {
			dispatch(patientDeleteProfile(id));
		}
	};

	return (
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

			<div>
				<Col>
					<Link to="/admin">
						<Button style={{ marginLeft: 10, marginBottom: 6, float: "left", fontSize: 15 }} size="lg">
							Back to operations page
						</Button>
					</Link>
				</Col>
				<Col>
					<Link to="/patient-register">
						<Button style={{ marginRight: 10, marginBottom: 6, float: "right", fontSize: 15 }} size="lg">
							+ Create New Patient Account
						</Button>
					</Link>
				</Col>
			</div>
			<br></br>

			<br></br>
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			<br></br>
			{patients?.map((patientList) => (
				<div key={patientList._id} className="listContainer">
					<Accordion>
						<Card style={{ margin: 10 }}>
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
										<p className="nic">
											Patient NIC : &emsp;
											{patientList.nic}{" "}
										</p>{" "}
										<p className="name">
											Patient Name : &emsp;
											{patientList.name}
										</p>
									</Accordion.Toggle>
								</span>
								<div>
									<Button href={`/admin-patient-edit/${patientList._id}`}>Edit</Button>
								</div>
								&emsp;
								<div>
									<Button variant="danger" className="mx-2" onClick={() => deleteHandler(patientList._id)}>
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
										<Card.Footer className="text-muted">
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
	);
};

export default PatientListForAdmin;
