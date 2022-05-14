import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { doctorLogin } from "../../../actions/doctorActions";

const DoctorLoginScreen = () => {
	const [nic, setNic] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { loading, error } = doctor_Login;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(doctorLogin(nic, password));
	};

	return (
		<div className="doctorLoginBg">
			<MainScreen title="LOGIN - DOCTOR">
				<br></br>
				<br></br>
				<Card
					className="profileCont"
					style={{
						marginLeft: "10%",
						marginRight: "10%",
						borderRadius: 45,
						borderWidth: 2.0,
						marginTop: 20,
						paddingInline: 35,
						background: "rgba(231, 238, 238, 0.9)",
					}}
				>
					<br></br>
					<br></br>
					<div className="DoctorLoginContainer">
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{loading && <Loading />}
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label style={{ fontSize: 20 }}>NIC Number</Form.Label>
								<Form.Control
									type="text"
									value={nic}
									placeholder="Enter NIC"
									onChange={(e) => setNic(e.target.value)}
									required
								/>
							</Form.Group>
							<br></br>
							<Form.Group controlId="formBasicPassword">
								<Form.Label style={{ fontSize: 20 }}>Password</Form.Label>
								<Form.Control
									type="password"
									value={password}
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</Form.Group>

							<Button
								variant="primary"
								type="submit"
								className="loginBtn"
								style={{
									fontSize: 15,
									float: "right",
									marginTop: 5,
								}}
							>
								Submit
							</Button>
						</Form>
					</div>
					<br></br>
				</Card>
			</MainScreen>
		</div>
	);
};

export default DoctorLoginScreen;
