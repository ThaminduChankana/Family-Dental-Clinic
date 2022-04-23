import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../../components/MainScreen";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import "./LoginScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../actions/adminActions";

const AdminLoginScreen = ({ history }) => {
	const [nic, setNic] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { loading, error, adminInfo } = admin_Login;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(adminLogin(nic, password));
	};

	return (
		<MainScreen title="LOGIN - ADMIN">
			<div className="AdminLoginContainer">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>NIC Number</Form.Label>
						<Form.Control type="text" value={nic} placeholder="Enter NIC" onChange={(e) => setNic(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</MainScreen>
	);
};

export default AdminLoginScreen;
