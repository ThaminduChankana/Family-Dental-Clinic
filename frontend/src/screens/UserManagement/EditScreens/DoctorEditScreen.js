import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../../components/MainScreen";
import "./EditScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { doctorLogin, doctorUpdateProfile } from "../../../actions/doctorActions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { useHistory } from "react-router-dom";

const DoctorEditScreen = () => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [sldaReg, setSldaReg] = useState("");
	const [licenceNo, setLicenceNo] = useState("");
	const [currentHospital, setCurrentHospital] = useState("");
	const [dataEntry, setDataEntry] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState();
	const [pic, setPic] = useState();
	const [picMessage, setPicMessage] = useState();
	const [regDate, setRegDate] = useState("");

	const dispatch = useDispatch();

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const doctorUpdate = useSelector((state) => state.doctorUpdate);
	const { loading, error, success } = doctorUpdate;

	useEffect(() => {
		setName(doctorInfo.name);
		setDob(doctorInfo.dob);
		setGender(doctorInfo.gender);
		setNic(doctorInfo.nic);
		setTelephone(doctorInfo.telephone);
		setAddress(doctorInfo.address);
		setSldaReg(doctorInfo.sldaReg);
		setLicenceNo(doctorInfo.licenceNo);
		setCurrentHospital(doctorInfo.currentHospital);
		setDataEntry(doctorInfo.dataEntry);
		setPic(doctorInfo.pic);
		setRegDate(doctorInfo.regDate);
	}, [doctorInfo]);

	const postDetails = (pics) => {
		setPicMessage(null);
		if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
			const data = new FormData();
			data.append("file", pics);
			data.append("upload_preset", "doctorProfile");
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
			const doctorUpdatedInfo = {
				name,
				dob,
				gender,
				nic,
				telephone,
				address,
				sldaReg,
				licenceNo,
				currentHospital,
				dataEntry,
				password,
				pic,
				regDate,
			};
			dispatch(doctorUpdateProfile(doctorUpdatedInfo));
			setMessage("Update Successful !");
		}
	};

	return (
		<MainScreen title="EDIT PROFILE - DOCTOR">
			<div className="loginContainer">
				<Row className="DoctorProfileContainer">
					<Col md={6}>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
						{loading && <Loading />}
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="doctorName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="name"
									value={name}
									placeholder="Enter name"
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="doctorDob">
								<Form.Label>Date Of Birth</Form.Label>
								<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
							</Form.Group>
							<div class="form-group">
								<label for="doctorGender">Gender</label>
								<select
									class="form-control"
									id="doctorGender"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
								>
									<option>Select Gender</option>
									<option value={gender.Male}>Male</option>
									<option value={gender.Female}>Female</option>
								</select>
							</div>
							<Form.Group controlId="doctorFormBasicNic">
								<Form.Label>NIC Number</Form.Label>
								<Form.Control
									type="text"
									value={nic}
									placeholder="Enter NIC"
									onChange={(e) => setNic(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="doctorFormBasicTelephone">
								<Form.Label>Telephone</Form.Label>
								<Form.Control
									type="text"
									value={telephone}
									placeholder="Enter Telephone Number"
									onChange={(e) => setTelephone(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="patientFormBasicAddress">
								<Form.Label>Address</Form.Label>
								<Form.Control
									type="textArea"
									value={address}
									placeholder="Enter Address"
									onChange={(e) => setAddress(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="doctorFormBasicSldaRegNo">
								<Form.Label>SLDA Register Number</Form.Label>
								<Form.Control
									type="text"
									value={sldaReg}
									placeholder="Enter SLDA Register Number"
									onChange={(e) => setSldaReg(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="doctorFormBasicLicenceNo">
								<Form.Label>License Number</Form.Label>
								<Form.Control
									type="text"
									value={licenceNo}
									placeholder="Enter Licence Number"
									onChange={(e) => setLicenceNo(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="doctorFormBasicCurrentHospital">
								<Form.Label>Currently Working Hospital</Form.Label>
								<Form.Control
									type="text"
									value={currentHospital}
									placeholder="Enter Currently Working Hospital"
									onChange={(e) => setCurrentHospital(e.target.value)}
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
							<Form.Group controlId="doctorRegDate">
								<Form.Label>Registration Date</Form.Label>
								<Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} />
							</Form.Group>
							<Form.Group controlId="doctorFormBasicDataEntryBy">
								<Form.Label>Data Entry By</Form.Label>
								<Form.Control
									type="text"
									value={dataEntry}
									placeholder="Enter Data Entering Person Name"
									onChange={(e) => setDataEntry(e.target.value)}
								/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Update
							</Button>
							&emsp;
							<Button variant="primary" href="/doctor-view">
								View Profile
							</Button>
							&emsp;
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

export default DoctorEditScreen;
