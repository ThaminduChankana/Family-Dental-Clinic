import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./EditScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, adminUpdateProfile } from "../../../actions/adminActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { useHistory } from "react-router-dom";

const AdminEditScreen = () => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [previousRef, setPreviousRef] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState();
	const [pic, setPic] = useState();
	const [picMessage, setPicMessage] = useState();

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const adminUpdate = useSelector((state) => state.adminUpdate);
	const { loading, error, success } = adminUpdate;

	useEffect(() => {
		setName(adminInfo.name);
		setDob(adminInfo.dob);
		setNic(adminInfo.nic);
		setTelephone(adminInfo.telephone);
		setAddress(adminInfo.address);
		setPreviousRef(adminInfo.previousRef);
		setPic(adminInfo.pic);
	}, [adminInfo]);

	const postDetails = (pics) => {
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

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			const adminUpdatedInfo = {
				name,
				dob,
				nic,
				telephone,
				address,
				previousRef,
				password,
				pic,
			};
			dispatch(adminUpdateProfile(adminUpdatedInfo));
			setMessage("Update Successful !");
		}
	};

	return (
		<MainScreen title="EDIT PROFILE - ADMIN">
			<div className="loginContainer">
				<Row className="AdminProfileContainer">
					<Col md={6}>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
						{loading && <Loading />}
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="adminName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="name"
									value={name}
									placeholder="Enter name"
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="adminDob">
								<Form.Label>Date Of Birth</Form.Label>
								<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
							</Form.Group>
							<Form.Group controlId="adminFormBasicNic">
								<Form.Label>NIC Number</Form.Label>
								<Form.Control
									type="text"
									value={nic}
									placeholder="Enter NIC"
									onChange={(e) => setNic(e.target.value)}
								/>
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
								Update
							</Button>
							&emsp;
							<Button variant="primary" href="/admin-view">
								View Profile
							</Button>
						</Form>
						&emsp;
					</Col>
					<Col
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<img src={pic} alt={name} className="profilePic" />
					</Col>
				</Row>
			</div>
		</MainScreen>
	);
};

export default AdminEditScreen;