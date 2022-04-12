import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { adminRegister } from "../../../actions/adminActions";
import MainScreen from "../../../components/MainScreen";
import "./RegisterScreen.css";

//name, dob, nic,telephone,address,previousRef,password,pic,dataEntry

const AdminRegisterScreen = ({ history }) => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [previousRef, setPreviousRef] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null); //msg if the user enters a wrong password
	const [picMessage, setPicMessage] = useState(null);

	const dispatch = useDispatch();
	const adminRegistration = useSelector((state) => state.adminRegistration);
	const { loading, error, adminInfo } = adminRegistration;

	/*useEffect(() => {
		if (adminInfo) {		
			history.push("/");
		}
	}, [history, adminInfo]);*/

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(adminRegister(name, dob, nic, telephone, address, previousRef, password, pic));
			setMessage("Admin Registration Successful");
		}
	};
	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "adminProfile");
			data.append("cloud_name", "family-dental-clinic");
			fetch("https://api.cloudinary.com/v1_1/family-dental-clinic/image/upload", {
				method: "post",
				body: data,
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return setPicMessage("Please Select an Image");
		}
	};

	return (
		<MainScreen title="REGISTER - ADMIN">
			<div className="loginContainer">
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
				{loading && <Loading />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="adminName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="name" value={name} placeholder="Enter name" onChange={(e) => setName(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="adminDob">
						<Form.Label>Date Of Birth</Form.Label>
						<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="adminFormBasicNic">
						<Form.Label>NIC Number</Form.Label>
						<Form.Control type="text" value={nic} placeholder="Enter NIC" onChange={(e) => setNic(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="adminFormBasicTelephone">
						<Form.Label>Telephone</Form.Label>
						<Form.Control
							type="text"
							value={telephone}
							placeholder="Enter Telephone Number"
							onChange={(e) => setTelephone(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="adminFormBasicAddress">
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="textArea"
							value={address}
							placeholder="Enter Address"
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="adminFormBasicPreviousRef">
						<Form.Label>Previous References</Form.Label>
						<Form.Control
							type="textArea"
							value={previousRef}
							placeholder="Enter Previous References"
							onChange={(e) => setPreviousRef(e.target.value)}
						/>
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

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							value={confirmpassword}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					{picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
					<Form.Group controlId="pic">
						<Form.Label>Profile Picture</Form.Label>
						<Form.File
							onChange={(e) => postDetails(e.target.files[0])}
							id="custom-file"
							type="image/png"
							label="Upload Profile Picture"
							custom
						/>
					</Form.Group>

					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form>
				<Row className="py-3">
					<Col>
						Have an Account ? <Link to="/login">Login</Link>
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default AdminRegisterScreen;
