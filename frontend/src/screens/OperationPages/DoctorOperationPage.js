import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Button, Col } from "react-bootstrap";
import { doctorLogout } from "../../actions/doctorActions";
import "./OperationPages.css";
import MainScreen from "../../components/MainScreen";

const DoctorOperationPage = ({ history }) => {
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(doctorLogout());
		history.push("/");
	};

	return (
		<MainScreen title={`Welcome Back ${doctorInfo && doctorInfo.name}..`}>
			<div>
				<Container>
					<Row>
						<Button variant="primary" onClick={logoutHandler} className="logoutBtn">
							Logout
						</Button>
						<div className="intro-text">
							<div className="buttonContainer">
								<a href="/doctor-view">
									<Button size="lg" className="landingbutton">
										My Account
									</Button>
								</a>
								<a href="">
									<Button size="lg" className="landingbutton">
										Doctor's Schedule Management
									</Button>
								</a>
								<a href="">
									<Button size="lg" className="landingbutton">
										Patient Management
									</Button>
								</a>
							</div>
							<div className="buttonContainer">
								<a href="/treatment-orthodontic-view">
									<Button size="lg" className="landingbutton">
										Patient Diagnosis Management
									</Button>
								</a>
								<a href="">
									<Button size="lg" className="landingbutton">
										Appointment Management
									</Button>
								</a>
								<a href="">
									<Button size="lg" className="landingbutton">
										Patient Medical History Management
									</Button>
								</a>
							</div>
							<div className="buttonContainer">
								<a href="">
									<Button size="lg" className="landingbutton">
										Doctor's Blog Management
									</Button>
								</a>
							</div>
						</div>
					</Row>
				</Container>
			</div>
		</MainScreen>
	);
};

export default DoctorOperationPage;
