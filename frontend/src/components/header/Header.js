import React from "react";
import "./navbar.css";
import image1 from "./logo4.png";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header({ setSearch }) {
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;

	return (
		<div className="Navbar">
			<div className="leftSide">
				<img src={image1} alt="" />
			</div>
			<div className="rightSide">
				<div className="links">
					<a style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }} href="/">
						Home
					</a>
					<a style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }} href="/aboutus">
						About Us
					</a>
					<a
						style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }}
						href="/articles"
					>
						Blogs
					</a>
					<a
						style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }}
						href="/common-view-feedback"
					>
						Reviews
					</a>
					<a
						style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }}
						href="/inquiries"
					>
						Contact Us
					</a>
					<a
						style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }}
						href="/schedules"
					>
						Schedule
					</a>
				</div>
				<div className="search">
					<Form inline>
						<input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
					</Form>
				</div>
				{adminInfo || patientInfo || doctorInfo ? (
					<></>
				) : (
					<Link to="/login-select">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "100px",
								backgroundColor: "#1ca9c9",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Login
						</Button>
					</Link>
				)}
				{adminInfo ? (
					<Link to="/admin">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "200px",
								backgroundColor: "#1ca9c9",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Activity Menu
						</Button>
					</Link>
				) : (
					<></>
				)}
				{patientInfo ? (
					<Link to="/patient">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "200px",
								backgroundColor: "#1ca9c9",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Activity Menu
						</Button>
					</Link>
				) : (
					<></>
				)}
				{doctorInfo ? (
					<Link to="/doctor">
						<Button
							style={{
								padding: "8px",
								fontSize: "15px",
								fontFamily: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
									Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
								width: "200px",
								backgroundColor: "#1ca9c9",
								fontWeight: 700,
							}}
							variant="primary"
							className="logoutBtn"
						>
							Activity Menu
						</Button>
					</Link>
				) : (
					<></>
				)}
			</div>
			<br />
		</div>
	);
}

export default Header;
