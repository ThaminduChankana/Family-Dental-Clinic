import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
export default function TreatmentNavBar() {
	return (
		<Navbar bg="light" variant="light" className="m-auto">
			<Container>
				<Navbar.Brand style={{ fontSize: 25 }} href="/doctor">
					Home
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link style={{ fontSize: 20, color: "black" }} href="/treatment-orthodontic-view">
						Orthodontic
					</Nav.Link>
					<Nav.Link style={{ fontSize: 20, color: "black" }} href="/treatment-filling-view">
						Filling
					</Nav.Link>
					<Nav.Link style={{ fontSize: 20, color: "black" }} href="/treatment-basicTreatment-view">
						Basic Treatment
					</Nav.Link>
					<Nav.Link style={{ fontSize: 20, color: "black" }} href="/treatment-report">
						Report
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}
