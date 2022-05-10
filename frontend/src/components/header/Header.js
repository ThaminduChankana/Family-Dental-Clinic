import React from "react";
import { Form, FormControl, Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = ({ setSearch }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="m-auto">
						<Form className="d-flex">
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Form>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
