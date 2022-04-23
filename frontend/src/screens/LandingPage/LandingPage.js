import { useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = () => {
	return (
		<div className="main">
			<Container>
				<Row>
					<div className="intro-text">
						<div className="buttonContainer">
							<a href="/admin-login">
								<Button size="lg" className="landingbutton">
									Admin Login
								</Button>
							</a>
							<a href="/admin-register">
								<Button variant="outline-primary" size="lg" className="landingbutton">
									Admin Signup
								</Button>
							</a>
						</div>
						<div className="buttonContainer">
							<a href="/doctor-login">
								<Button size="lg" className="landingbutton">
									Doctor Login
								</Button>
							</a>
							<a href="/doctor-register">
								<Button variant="outline-primary" size="lg" className="landingbutton">
									Doctor Signup
								</Button>
							</a>
						</div>
						<div className="buttonContainer">
							<a href="/patient-login">
								<Button size="lg" className="landingbutton">
									Patient Login
								</Button>
							</a>
							<a href="/patient-register">
								<Button variant="outline-primary" size="lg" className="landingbutton">
									Patient Signup
								</Button>
							</a>
						</div>
					</div>
				</Row>
			</Container>
		</div>
	);
};

export default LandingPage;
