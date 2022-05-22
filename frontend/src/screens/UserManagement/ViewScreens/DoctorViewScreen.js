import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./ViewScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { doctorLogout } from "../../../actions/doctorActions";

const DoctorViewScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [sldaReg, setSldaReg] = useState("");
	const [licenceNo, setLicenceNo] = useState("");
	const [currentHospital, setCurrentHospital] = useState("");
	const [pic, setPic] = useState();
	const [regDate, setRegDate] = useState("");
	const [dataEntry, setDataEntry] = useState("");

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	useEffect(() => {
		setName(doctorInfo.name);
		setDob(doctorInfo.dob);
		setGender(doctorInfo.gender);
		setNic(doctorInfo.nic);
		setTelephone(doctorInfo.telephone);
		setAddress(doctorInfo.address);
		setEmail(doctorInfo.email);
		setPic(doctorInfo.pic);
		setSldaReg(doctorInfo.sldaReg);
		setLicenceNo(doctorInfo.licenceNo);
		setCurrentHospital(doctorInfo.currentHospital);
		setRegDate(doctorInfo.regDate);
		setDataEntry(doctorInfo.dataEntry);
	}, [doctorInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(doctorLogout());
		history.push("/");
	};
	if (doctorInfo) {
		return (
			<div className="profileViewBg">
				<MainScreen title="VIEW PROFILE - DOCTOR">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/doctor"
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
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="loginContainer">
							<Row className="DoctorProfileContainer">
								<Col md={6}>
									<Form>
										<Form.Group controlId="doctorViewName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="text"
												value={name}
												onChange={(e) => setName(e.target.value)}
												readOnly
											></Form.Control>
										</Form.Group>
										<Form.Group controlId="doctorViewDob">
											<Form.Label>Date Of Birth</Form.Label>
											<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} readOnly />
										</Form.Group>

										<Form.Group controlId="doctorViewFormBasicNic">
											<Form.Label>Gender</Form.Label>
											<Form.Control type="text" value={gender} onChange={(e) => setGender(e.target.value)} readOnly />
										</Form.Group>

										<Form.Group controlId="doctorViewFormBasicNic">
											<Form.Label>NIC Number</Form.Label>
											<Form.Control type="text" value={nic} onChange={(e) => setNic(e.target.value)} readOnly />
										</Form.Group>

										<Form.Group controlId="doctorViewFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												onChange={(e) => setTelephone(e.target.value)}
												readOnly
											/>
										</Form.Group>

										<Form.Group controlId="doctorViewFormBasicAddress">
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

										<Form.Group controlId="doctorViewFormBasicPreviousRef">
											<Form.Label>SLDA Register Number</Form.Label>
											<Form.Control type="text" value={sldaReg} onChange={(e) => setSldaReg(e.target.value)} readOnly />
										</Form.Group>
										<Form.Group controlId="doctorViewFormBasicLicenceNo">
											<Form.Label>License Number</Form.Label>
											<Form.Control
												type="text"
												value={licenceNo}
												onChange={(e) => setLicenceNo(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="doctorViewFormBasicCurrentHospital">
											<Form.Label>Currently Working Hospital</Form.Label>
											<Form.Control
												type="text"
												value={currentHospital}
												onChange={(e) => setCurrentHospital(e.target.value)}
												readOnly
											/>
										</Form.Group>
										<Form.Group controlId="doctorViewRegDate">
											<Form.Label>Registration Date</Form.Label>
											<Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} readOnly />
										</Form.Group>
										<Form.Group controlId="doctorViewFormBasicDataEntryBy">
											<Form.Label>Data Entry By</Form.Label>
											<Form.Control
												type="text"
												value={dataEntry}
												onChange={(e) => setDataEntry(e.target.value)}
												readOnly
											/>
										</Form.Group>
									</Form>
									<br></br>
									<Button
										variant="primary"
										href="/doctor-edit"
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

export default DoctorViewScreen;
