import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Button, Col, Card } from "react-bootstrap";
import { patientLogout } from "../../actions/patientActions";
import "./OperationPages.css";
import MainScreen from "../../components/MainScreen";

const PatientOperationPage = ({ history }) => {
	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(patientLogout());
		history.push("/");
	};

	return (
		<div className="patientBackground">
			<MainScreen title={`Welcome Back ${patientInfo && patientInfo.name} ...`}>
				<Button variant="danger" onClick={logoutHandler} className="logoutBtn" style={{ float: "right" }}>
					Logout
				</Button>
				<br></br>
				<div className="loginContainer">
					<Card
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
							marginLeft: "20%",
							marginRight: "20%",
						}}
					>
						<div className="intro-text">
							<br></br>
							<br></br>
							<a href="/patient-view">
								<Button size="lg" style={{ width: 350, height: 75 }}>
									My Account
								</Button>
							</a>
							<br></br>
							<br></br>
							<a href="/">
								<Button size="lg" style={{ width: 350, height: 75 }}>
									Appointment Management
								</Button>
							</a>
							<br></br>
							<br></br>
							<a href="/">
								<Button size="lg" style={{ width: 350, height: 75 }}>
									Medical History Management
								</Button>
							</a>
							<br></br>
							<br></br>
							<br></br>
						</div>
					</Card>
				</div>
			</MainScreen>
		</div>
	);
};

export default PatientOperationPage;
