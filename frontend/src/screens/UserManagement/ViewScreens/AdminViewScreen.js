import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./ViewScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { adminLogout } from "../../../actions/adminActions";

const AdminViewScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [previousRef, setPreviousRef] = useState("");
	const [pic, setPic] = useState();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	useEffect(() => {
		setName(adminInfo.name);
		setDob(adminInfo.dob);
		setNic(adminInfo.nic);
		setTelephone(adminInfo.telephone);
		setAddress(adminInfo.address);
		setEmail(adminInfo.email);
		setPreviousRef(adminInfo.previousRef);
		setPic(adminInfo.pic);
	}, [adminInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(adminLogout());
		history.push("/");
	};

	if (adminInfo) {
		return (
			<div className="profileViewBg">
				<MainScreen title="VIEW PROFILE - ADMIN">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/admin"
					>
						{" "}
						Back to Operations Page
					</Button>
					<Button
						variant="danger"
						onClick={logoutHandler}
						style={{
							float: "right",
							marginTop: 5,
							fontSize: 15,
							marginRight: 10,
						}}
					>
						Logout
					</Button>
					<br></br>
					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="loginContainer">
							<Row className="AdminProfileContainer">
								<Col md={6}>
									<Form>
										<Form.Group controlId="adminViewName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												readOnly
											></Form.Control>
										</Form.Group>
										<Form.Group controlId="adminViewDob">
											<Form.Label>Date Of Birth</Form.Label>
											<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} readOnly />
										</Form.Group>

										<Form.Group controlId="adminViewFormBasicNic">
											<Form.Label>NIC Number</Form.Label>
											<Form.Control type="text" value={nic} onChange={(e) => setNic(e.target.value)} readOnly />
										</Form.Group>

										<Form.Group controlId="adminFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												readOnly
											/>
										</Form.Group>

										<Form.Group controlId="adminFormBasicAddress">
											<Form.Label>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												readOnly
											/>
										</Form.Group>

										<Form.Group controlId="adminFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
										</Form.Group>

										<Form.Group controlId="adminFormBasicPreviousRef">
											<Form.Label>Previous References</Form.Label>
											<Form.Control
												type="textArea"
												value={previousRef}
												onChange={(e) => setPreviousRef(e.target.value)}
												readOnly
											/>
										</Form.Group>
									</Form>
									<br></br>
									<Button
										variant="primary"
										href="/admin-edit"
										style={{
											fontSize: 15,
										}}
									>
										Edit profile
									</Button>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={pic}
										alt={name}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 250,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
						</div>
						<br></br>
					</Card>
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

export default AdminViewScreen;
