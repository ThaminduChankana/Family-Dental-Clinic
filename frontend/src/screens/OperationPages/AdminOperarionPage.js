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
		<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
			<div>
				<Container>
					<Row>
						<Button variant="primary" onClick={logoutHandler} className="logoutBtn">
							Logout
						</Button>
						<div className="intro-text">
							<div className="buttonContainer">
								<a href="/admin-view">
									<Button size="lg" className="landingbutton">
										My Account
									</Button>
								</a>
								<a href="/admin-patients">
									<Button size="lg" className="landingbutton">
										Patient Account Management
									</Button>
								</a>
								<a href="/admin-doctors">
									<Button size="lg" className="landingbutton">
										Doctor Account Management
									</Button>
								</a>
							</div>
							<div className="buttonContainer">
								<a href="/">
									<Button size="lg" className="landingbutton">
										Inventory Management
									</Button>
								</a>

								<a href="/question-adminview">
									<Button size="lg" className="landingbutton">
										Q & A Management
									</Button>
								</a>
								<a href="/">
									<Button size="lg" className="landingbutton">
										Patient Medical History Management
									</Button>
								</a>
							</div>
							<div className="buttonContainer">
								<a href="/">
									<Button size="lg" className="landingbutton">
										Appointment Management
									</Button>
								</a>
								<a href="/">
									<Button size="lg" className="landingbutton">
										Doctor's Schedule Management
									</Button>
								</a>
								<a href="/feedback-adminview">
									<Button size="lg" className="landingbutton">
										Feedback Management
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

export default AdminOperationPage;
