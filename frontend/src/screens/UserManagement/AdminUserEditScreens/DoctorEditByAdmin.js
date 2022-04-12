import React, { useEffect, useState } from "react";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { doctorViewProfileById, doctorUpdateProfileById } from "../../../actions/doctorActions";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import ReactMarkdown from "react-markdown";
import { authHeader } from "../../../actions/adminActions";

const DoctorEditByAdmin = ({ match, history }) => {
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

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const doctorUpdateById = useSelector((state) => state.doctorUpdateById);
	const { loading, error} = doctorUpdateById;


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
				dispatch(
					doctorUpdateProfileById(
						match.params.id,
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
						message,
						pic,
						regDate
					)
				);
				setMessage("Update Successful");
			}
		};

	useEffect(() => {
		if (adminInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`/user/admin/doctor/profile/view/${match.params.id}`, {
					headers: authHeader(),
				});
				setName(data.name);
				setDob(data.dob);
				setGender(data.gender);
				setNic(data.nic);
				setTelephone(data.telephone);
				setAddress(data.address);
				setSldaReg(data.sldaReg);
				setLicenceNo(data.licenceNo);
				setCurrentHospital(data.currentHospital);
				setDataEntry(data.dataEntry);
				setPic(data.pic);
				setRegDate(data.regDate);
			};

			fetching();
		}
	}, [match.params.id, adminInfo]);

	return (
		<MainScreen title="ADMIN EDIT DOCTOR PROFILE">
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
									placeholder="Enter name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Form.Group>
							<Form.Group controlId="doctorDob">
								<Form.Label>Date Of Birth</Form.Label>
								<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
							</Form.Group>
							<div className="form-group">
								<label name="doctorGender">Gender</label>
								<select
									className="form-control"
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

export default DoctorEditByAdmin;
