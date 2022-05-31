import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
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

	if (adminInfo) {
		return (
			<div className="adminBackground">
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<Button
						variant="danger"
						onClick={logoutHandler}
						className="logoutBtn"
						style={{ float: "right", marginTop: 7 }}
					>
						Logout
					</Button>

					<br></br>
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
								</div>
								<br></br>
								<div>
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
								<br></br>
								<div>
									<Link to="/inventory-view">
										<Button size="lg" className="landingbutton">
											Inventory Management
										</Button>
									</Link>
									<Link to="/admin-feedback-Q&A">
										<Button size="lg" className="landingbutton">
											Feedback and Q & A Management
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/admin-blog-report">
										<Button size="lg" className="landingbutton">
											Doctor Blogs Report
										</Button>
									</Link>
									<Link to="/admin-medical-history">
										<Button size="lg" className="landingbutton">
											Patient Medical History Management
										</Button>
									</Link>
								</div>
								<br></br>
								<div>
									<Link to="/schedule-Handling-View">
										<Button size="lg" className="landingbutton">
											Doctor's Schedule Management
										</Button>
									</Link>
								</div>
							</div>
							<br></br>
							<br></br>
						</Card>
					</div>
				</MainScreen>
				<br></br>
				<br></br>
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

export default AdminOperationPage;
