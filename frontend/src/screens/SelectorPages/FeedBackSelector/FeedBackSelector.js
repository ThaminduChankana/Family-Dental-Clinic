import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";
import "./FeedBackSelector.css";

const FeedbackSelectorPage = () => {
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<div className="feedBackSelectBg">
				<MainScreen title={"Feedback And Q&A Management"}>
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/admin"
					>
						{" "}
						Back to Operations Page
					</Button>
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

								<a href="/feedback-adminview">
									<Button size="lg" className="landingbutton">
										Feedback Management
									</Button>
								</a>

								<a href="/question-adminview">
									<Button size="lg" className="landingbutton">
										Q & A Management
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
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
};

export default FeedbackSelectorPage;
