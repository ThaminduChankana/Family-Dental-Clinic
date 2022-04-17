import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./ViewScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { patientLogout } from "../../../actions/patientActions";

const PatientViewScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [pic, setPic] = useState();
	const [regDate, setRegDate] = useState("");
	const [dataEntry, setDataEntry] = useState("");

	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;

	useEffect(() => {
		setName(patientInfo.name);
		setDob(patientInfo.dob);
		setGender(patientInfo.gender);
		setNic(patientInfo.nic);
		setTelephone(patientInfo.telephone);
		setAddress(patientInfo.address);
		setPic(patientInfo.pic);
		setRegDate(patientInfo.regDate);
		setDataEntry(patientInfo.dataEntry);
	}, [patientInfo]);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(patientLogout());
		history.push("/");
	};

	return (
		<MainScreen title="VIEW PROFILE - PATIENT">
			<div>
				<Row className="PatientProfileContainer">
					<Col md={6}>
						<Form>
							<Button variant="primary" onClick={logoutHandler}>
								Logout
							</Button>
							<Form.Group controlId="patientViewName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									readOnly
								></Form.Control>
							</Form.Group>
							<Form.Group controlId="patientViewDob">
								<Form.Label>Date Of Birth</Form.Label>
								<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} readOnly />
							</Form.Group>

							<Form.Group controlId="patientViewFormBasicNic">
								<Form.Label>Gender</Form.Label>
								<Form.Control type="text" value={gender} onChange={(e) => setGender(e.target.value)} readOnly />
							</Form.Group>

							<Form.Group controlId="patientViewFormBasicNic">
								<Form.Label>NIC Number</Form.Label>
								<Form.Control type="text" value={nic} onChange={(e) => setNic(e.target.value)} readOnly />
							</Form.Group>

							<Form.Group controlId="patientViewFormBasicTelephone">
								<Form.Label>Telephone</Form.Label>
								<Form.Control type="text" value={telephone} onChange={(e) => setTelephone(e.target.value)} readOnly />
							</Form.Group>

							<Form.Group controlId="patientViewFormBasicAddress">
								<Form.Label>Address</Form.Label>
								<Form.Control type="textArea" value={address} onChange={(e) => setAddress(e.target.value)} readOnly />
							</Form.Group>

							<Form.Group controlId="patientViewRegDate">
								<Form.Label>Registration Date</Form.Label>
								<Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} readOnly />
							</Form.Group>
							<Form.Group controlId="patientViewFormBasicDataEntryBy">
								<Form.Label>Data Entry By</Form.Label>
								<Form.Control type="text" value={dataEntry} onChange={(e) => setDataEntry(e.target.value)} readOnly />
							</Form.Group>
						</Form>
						<Button variant="primary" href="/patient-edit">
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
						<img src={pic} alt={name} className="profilePic" />
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default PatientViewScreen;
