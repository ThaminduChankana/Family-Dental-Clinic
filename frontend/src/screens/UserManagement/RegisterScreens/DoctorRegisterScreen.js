import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { doctorRegister } from "../../../actions/doctorActions";
import MainScreen from "../../../components/MainScreen";
import "./RegisterScreen.css";

const DoctorRegisterScreen = () => {
	const [name, setName] = useState("");
	const [dob, setDob] = useState("");
	const [gender, setGender] = useState("");
	const [nic, setNic] = useState("");
	const [telephone, setTelephone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");
	const [sldaReg, setSldaReg] = useState("");
	const [licenceNo, setLicenceNo] = useState("");
	const [currentHospital, setCurrentHospital] = useState("");
	const [dataEntry, setDataEntry] = useState("");
	const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [picMessage, setPicMessage] = useState(null);
	const [regDate, setRegDate] = useState("");

	const dispatch = useDispatch();
	const doctorRegistration = useSelector((state) => state.doctorRegistration);
	const { loading, error } = doctorRegistration;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmpassword) {
			setMessage("Passwords do not match");
		} else {
			dispatch(
				doctorRegister(
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					sldaReg,
					licenceNo,
					currentHospital,
					password,
					pic,
					dataEntry,
					regDate
				)
			);
		}
	};
	const demoHandler = async (e) => {
		e.preventDefault();

		setName("John Doe");
		setDob("1950-06-06");
		setNic("195045656585");
		setTelephone("0777777777");
		setAddress("Colombo");
		setEmail("johndoe@gmail.com");
		setGender("Male");
		setSldaReg("reg123");
		setLicenceNo("lic123");
		setCurrentHospital("Colombo");
		setDataEntry("Admin");
		setRegDate("2022-05-19");
	};

	const resetHandler = async (e) => {
		e.preventDefault();

		setName("");
		setDob("");
		setNic("");
		setTelephone("");
		setAddress("");
		setEmail("");
		setGender("");
		setSldaReg("");
		setLicenceNo("");
		setCurrentHospital("");
		setDataEntry("");
		setRegDate("");
	};

	const postDetails = (pics) => {
		if (pics === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg") {
			return setPicMessage("Please Select an Image");
		}
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

	if (adminInfo) {
		return (
			<div className="registerBg">
				<MainScreen title="REGISTER - DOCTOR">
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/admin-doctors"
					>
						{" "}
						Back to Doctors List
					</Button>
					<br></br>

					<br></br>
					<Card
						className="profileCont"
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="loginContainer">
							<div>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								{message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
								{loading && <Loading />}
							</div>
							<Row className="DoctorProfileContainer">
								<Col md={6}>
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="doctorName">
											<Form.Label>Name</Form.Label>
											<Form.Control
												type="name"
												value={name}
												placeholder="Enter name"
												onChange={(e) => setName(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorDob">
											<Form.Label>Date Of Birth</Form.Label>
											<Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
										</Form.Group>
										<div className="form-group">
											<label className="doctorGender">Gender</label>
											<select
												className="form-control"
												id="doctorGender"
												value={gender}
												onChange={(e) => setGender(e.target.value)}
												required
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
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicTelephone">
											<Form.Label>Telephone</Form.Label>
											<Form.Control
												type="text"
												value={telephone}
												placeholder="Enter Telephone Number"
												onChange={(e) => setTelephone(e.target.value)}
												required
												maxLength={10}
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicAddress">
											<Form.Label>Address</Form.Label>
											<Form.Control
												type="textArea"
												value={address}
												placeholder="Enter Address"
												onChange={(e) => setAddress(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicEmail">
											<Form.Label>Email</Form.Label>
											<Form.Control
												type="email"
												value={email}
												placeholder="Enter Email Address"
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicSldaRegNo">
											<Form.Label>SLDA Register Number</Form.Label>
											<Form.Control
												type="text"
												value={sldaReg}
												placeholder="Enter SLDA Register Number"
												onChange={(e) => setSldaReg(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicLicenceNo">
											<Form.Label>License Number</Form.Label>
											<Form.Control
												type="text"
												value={licenceNo}
												placeholder="Enter Licence Number"
												onChange={(e) => setLicenceNo(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="doctorFormBasicCurrentHospital">
											<Form.Label>Currently Working Hospital</Form.Label>
											<Form.Control
												type="text"
												value={currentHospital}
												placeholder="Enter Currently Working Hospital"
												onChange={(e) => setCurrentHospital(e.target.value)}
												required
											/>
										</Form.Group>
										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												value={password}
												placeholder="Password"
												onChange={(e) => setPassword(e.target.value)}
												required
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
											<Form.Control type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)} required />
										</Form.Group>
										<Form.Group controlId="doctorFormBasicDataEntryBy">
											<Form.Label>Data Entry By</Form.Label>
											<Form.Control
												type="text"
												value={dataEntry}
												placeholder="Enter Data Entering Person Name"
												onChange={(e) => setDataEntry(e.target.value)}
												required
											/>
										</Form.Group>
										<Button
											variant="primary"
											type="submit"
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Register
										</Button>
										&emsp;
										<Button
											variant="danger"
											onClick={resetHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Reset
										</Button>
										&emsp;
										<Button
											variant="info"
											onClick={demoHandler}
											style={{
												fontSize: 15,
												marginTop: 10,
											}}
										>
											Demo
										</Button>
									</Form>
								</Col>
								<Col
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<img
										src={pic}
										alt={name}
										className="profilePic"
										style={{
											boxShadow: "7px 7px 20px ",
											borderColor: "black",
											borderRadius: 250,
											background: "white",
											width: "300px",
											height: "300px",
										}}
									/>
								</Col>
							</Row>
						</div>
					</Card>
					<br></br>
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

export default DoctorRegisterScreen;
