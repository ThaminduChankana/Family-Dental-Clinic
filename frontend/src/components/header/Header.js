import React from "react";
import "./navbar.css";
import image1 from "./logo4.png";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Header({ setSearch }) {
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;
	const dispatch = useDispatch();

	return (
		<div className="Navbar">
			<div className="leftSide">
				<img src={image1} alt="" />
			</div>
			<div className="rightSide">
				<div className="links">
					<a style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }} href="/home">
						Home
					</a>
					<a style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }} href="/aboutus">
						About Us
					</a>
					<a style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }} href="/blogs">
						Blogs
					</a>
					<a style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }} href="/reviews">
						Reviews
					</a>
					<a
						style={{ textDecoration: "none", color: "#0d5875", fontSize: "20px", marginLeft: "35px" }}
						href="/contactus"
					>
						Contact Us
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
					<Link to="/">
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
			</div>
		</div>
	);
}

export default Header;
