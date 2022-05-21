import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
export default function TreatmentNavBar() {
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;
	if (doctorInfo) {
		return (
			<div>
				<Navbar
					bg="primary"
					variant="light"
					className="m-auto"
					style={{ borderRadius: 40, borderColor: "#808080", borderWidth: 0.5, height: 50, width: "90%" }}
				>
					<Container>
						<Nav className="me-auto">
							<Nav.Link style={{ fontSize: 25, color: "white" }} href="/doctor">
								&emsp;Operation Page &emsp;
							</Nav.Link>
							<Nav.Link style={{ fontSize: 25, color: "white" }} href="/treatment-orthodontic-view">
								Orthodontics &emsp;
							</Nav.Link>
							<Nav.Link style={{ fontSize: 25, color: "white" }} href="/treatment-filling-view">
								Fillings&emsp;
							</Nav.Link>
							<Nav.Link style={{ fontSize: 25, color: "white" }} href="/treatment-basicTreatment-view">
								Basic Treatment &emsp;
							</Nav.Link>
							<Nav.Link style={{ fontSize: 25, color: "white" }} href="/treatment-report">
								Report Generation
							</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
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
}
