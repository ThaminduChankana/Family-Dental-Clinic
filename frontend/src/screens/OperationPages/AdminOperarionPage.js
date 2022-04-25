import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Button, Col } from "react-bootstrap";
import { adminLogout } from "../../actions/adminActions";
import "./OperationPages.css";
import MainScreen from "../../components/MainScreen";

const AdminOperationPage = ({ history }) => {
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const dispatch = useDispatch();
	const logoutHandler = () => {
		dispatch(adminLogout());
		history.push("/");
	};

	return (
		<div className="bg">
			<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
				<div>
					<Container>
						<Row>
							<Button variant="primary" onClick={logoutHandler} className="logoutBtn">
								Logout
							</Button>
							<div className="intro-text">
								<div className="buttonContainer">
									<Link to="/admin-view">
										<Button size="lg" className="landingbutton">
											My Account
										</Button>
									</Link>
									<Link to="/admin-register">
										<Button size="lg" className="landingbutton">
											Create New Admin Account
										</Button>
									</Link>
									<Link to="/admin-patients">
										<Button size="lg" className="landingbutton">
											Patient Account Management
										</Button>
									</Link>
									<Link to="/admin-doctors">
										<Button size="lg" className="landingbutton">
											Doctor Account Management
										</Button>
									</Link>
								</div>
								<div className="buttonContainer">
									<Link to="/">
										<Button size="lg" className="landingbutton">
											Inventory Management
										</Button>
									</Link>
									<Link to="/">
										<Button size="lg" className="landingbutton">
											Feedback Management
										</Button>
									</Link>
									<Link to="/">
										<Button size="lg" className="landingbutton">
											Q & A Management
										</Button>
									</Link>
									<Link to="/">
										<Button size="lg" className="landingbutton">
											Patient Medical History Management
										</Button>
									</Link>
								</div>
								<div className="buttonContainer">
									<Link to="/">
										<Button size="lg" className="landingbutton">
											Appointment Management
										</Button>
									</Link>
									<Link to="/">
										<Button size="lg" className="landingbutton">
											Doctor's Schedule Management
										</Button>
									</Link>
								</div>
							</div>
						</Row>
					</Container>
				</div>
			</MainScreen>
		</div>
	);
};

export default AdminOperationPage;
