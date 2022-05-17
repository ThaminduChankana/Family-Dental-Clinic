import { Button, Card } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./FeedBackSelector.css";

const FeedbackSelectorPage = () => {
	return (
		<div className="feedBackSelectBg">
			<MainScreen title={"Feedback And Q&A Management"}>
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

							<a href="/">
								<Button size="lg" className="landingbutton">
									Feedback Management
								</Button>
							</a>

							<a href="/">
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
};

export default FeedbackSelectorPage;
