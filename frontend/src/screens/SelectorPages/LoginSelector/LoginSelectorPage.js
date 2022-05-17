import { Button, Card } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./LoginSelector.css";

const LoginSelectorPage = () => {
	return (
		<div className="loginSelectBg">
			<MainScreen title={"Log in Here ..."}>
				<br></br>
				<br></br>
				<Card
					style={{
						borderRadius: 45,
						borderWidth: 2.0,
						marginTop: 80,
						paddingInline: 10,
						background: "rgba(231, 238, 238, 0.8)",
					}}
				>
					<div className="loginSelect">
						<div className="intro-text" style={{ marginTop: 10 }}>
							<br></br>
							<br></br>

							<a href="/admin-login">
								<Button size="lg" className="landingbutton">
									Admin Login
								</Button>
							</a>

							<a href="/doctor-login">
								<Button size="lg" className="landingbutton">
									Doctor Login
								</Button>
							</a>

							<a href="/patient-login">
								<Button size="lg" className="landingbutton">
									Patient Login
								</Button>
							</a>

							<br></br>
							<br></br>
							<br></br>
							<br></br>
						</div>
					</div>
				</Card>
			</MainScreen>
		</div>
	);
};

export default LoginSelectorPage;
