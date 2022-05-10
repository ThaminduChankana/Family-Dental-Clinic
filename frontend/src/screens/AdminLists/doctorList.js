import React, { useEffect } from "react";
import { Accordion, Button, Card, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doctorDeleteProfile, doctorsList } from "../../actions/doctorActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "../AdminLists/lists.css"

const DoctorListForAdmin = () => {
	const dispatch = useDispatch();

	const doctorList = useSelector((state) => state.doctorList);
	const { loading, doctors, error } = doctorList;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const doctorUpdate = useSelector((state) => state.doctorUpdate);
	const { success: successUpdate } = doctorUpdate;

	const doctorDelete = useSelector((state) => state.doctorDelete);
	const { error: errorDelete, success: successDelete } = doctorDelete;
	console.log();

	const history = useHistory();

	useEffect(() => {
		//Function or React hook that is fired off whenever a component is rendered, as soon as pages are rendered the api is called
		dispatch(doctorsList());
		if (!adminInfo) {
			history.push("/");
		}
	}, [dispatch, history, adminInfo, doctorDelete, successDelete, successUpdate]);

	const deleteHandler = (id) => {
		if (window.confirm("Are You Sure?")) {
			dispatch(doctorDeleteProfile(id));
		}
	};

	return (
		<div className="doctorList">
		<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
			<h1
				style={{
					display: "flex",
					marginLeft: "10px",
					width: "500px",
				}}
			>
				Doctors List
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
					<Link to="/doctor-register">
						<Button style={{ marginRight: 10, marginBottom: 6, float: "right", fontSize: 15 }} size="lg">
							+ Create New Doctor Account
						</Button>
					</Link>
				</Col>
			</div>
			<br></br>
			<br></br>

			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loading && <Loading />}

			<br></br>
			{doctors?.map((doctorList) => (
				<div key={doctorList._id}>
					<Accordion>
						<Card style={{ margin: 10, borderRadius:25,borderWidth: 1.0, borderColor:"rgb(0,0,0,0.5)",
						marginTop: 20,
						paddingInline: 10,
						background: "rgb(235, 235, 235)" }}
						>
							<Card.Header style={{ display: "flex",paddingInline: 10,borderRadius:25,marginTop:10,marginBottom:10,borderColor:"black",
						background: "rgba(255, 255, 255)" }}>
								<span
									// onClick={() => ModelShow(note)}
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
										<p className="nic" style={{paddingInline:20,marginTop:10}}>
											Doctor NIC : &emsp;
											{doctorList.nic}&emsp;
										</p>{" "}
										<p className="name" style={{paddingInline:20}}>
											Doctor Name : &emsp;
											{doctorList.name}
										</p>
									</Accordion.Toggle>
								</span>
								<div>
									<Button style={{marginTop:25,fontSize:15}} href={`/admin-doctor-edit/${doctorList._id}`}>Edit</Button>
								</div>
								&emsp;
								<div>
									<Button style={{marginTop:25,fontSize:15}} variant="danger" className="mx-2" onClick={() => deleteHandler(doctorList._id)}>
										Delete
									</Button>
								</div>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<Row>
										<Col md={6}>
											<h5>Name - {doctorList.name}</h5>
											<h5>Date of Birth - {doctorList.dob}</h5>
											<h5>Gender - {doctorList.gender}</h5>
											<h5>NIC - {doctorList.nic}</h5>
											<h5>Telephone - {doctorList.telephone}</h5>
											<h5>Address - {doctorList.address}</h5>
											<h5>Email - {doctorList.email}</h5>
											<h5>SLDA Reg No. - {doctorList.sldaReg}</h5>
											<h5>Licence No. - {doctorList.licenceNo}</h5>
											<h5>Current Hospital - {doctorList.currentHospital}</h5>
											<h5>Data Entry By - {doctorList.dataEntry}</h5>
											<h5>Registered Date - {doctorList.regDate}</h5>
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
											<img src={doctorList.pic} alt={doctorList.name} className="profilePic" />
										</Col>
									</Row>

									<blockquote className="blockquote mb-0">
										<Card.Footer style={{borderRadius:20,background:"white"}} className="text-muted">
											Created on -<cite title="Source Title"> {doctorList.createdAt.substring(0, 10)}</cite>
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
};

export default DoctorListForAdmin;

/* eventKey is an identifier like what you want to trigger with accordion.collapse */
