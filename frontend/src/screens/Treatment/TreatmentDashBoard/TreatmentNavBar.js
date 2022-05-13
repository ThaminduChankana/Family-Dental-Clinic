import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
export default function TreatmentNavBar() {
	return (
		<div>
			<Navbar
				bg="primary"
				variant="light"
				className="m-auto"
				style={{ width: "70%", borderRadius: 40, borderColor: "#808080", borderWidth: 0.5 }}
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
							Report Generation &emsp;
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</div>
	);
}
