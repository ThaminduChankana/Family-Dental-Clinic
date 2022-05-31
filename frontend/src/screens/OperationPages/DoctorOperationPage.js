import { useDispatch, useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
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
	if (doctorInfo) {
		return (
			<div className="doctorBackground">
				<MainScreen title={`Welcome Back ${doctorInfo && doctorInfo.name} ...`}>
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
								marginLeft: "10%",
								marginRight: "10%",
							}}
						>
							<div className="intro-text">
								<br></br>
								<br></br>
								<div>
									<a href="/doctor-view">
										<Button size="lg" style={{ width: 350, height: 75 }}>
											My Account
										</Button>
									</a>
									&emsp;
									<a href="/doctor-patients">
										<Button size="lg" style={{ width: 350, height: 75 }}>
											Patient Management
										</Button>
									</a>
								</div>
								<br></br>
								<div>
									<a href="/treatment-orthodontic-view">
										<Button size="lg" className="landingbutton">
											Patient Diagnosis Management
										</Button>
									</a>
								</div>
								<br></br>
								<div>
									<a href="/doctor-articles">
										<Button size="lg" style={{ width: 350, height: 75 }}>
											Doctor's Blog Management
										</Button>
									</a>
									&emsp;
									<a href="/doctor-view-medical-history">
										<Button size="lg" style={{ width: 350, height: 75 }}>
											Patient Medical History Management
										</Button>
									</a>
								</div>
								<br></br>
							</div>
							<br></br>
							<br></br>
						</Card>
					</div>
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

export default DoctorOperationPage;
