import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Accordion, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMedicalHistoriesforDoctor } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MedicalHistoryListDoctor = ({ search }) => {
	const dispatch = useDispatch();

	const medicalHistoryListDoctor = useSelector((state) => state.medicalHistoryListDoctor);
	const { loading, medicalHistories, error } = medicalHistoryListDoctor;

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const history = useHistory();

	useEffect(() => {
		dispatch(listMedicalHistoriesforDoctor());
		if (!doctorInfo) {
			history.push("/access-denied");
		}
	}, [dispatch, history, doctorInfo]);

	return (
		<div className="medicalHistoryBg">
			<MainScreen title={`Welcome back ${doctorInfo && doctorInfo.name}..`}>
				<h1
					style={{
						display: "flex",
						marginLeft: "10px",
						width: "500px",
					}}
				>
					Patients' Medical History
				</h1>
				<Link to="/doctor">
					<Button
						style={{
							fontSize: 15,
							marginLeft: 10,
							marginTop: 5,
						}}
					>
						Back to Landing Page
					</Button>
				</Link>
				<br />

				{error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
				{loading && <Loading />}
				{medicalHistories
					?.reverse()
					.filter(
						(filtered) => filtered.pname.toLowerCase().includes(search.toLowerCase()) || filtered.nic.includes(search)
					)
					.map((medicalHistory) => (
						<Accordion key={medicalHistory._id}>
							<Card
								style={{
									margin: 10,
									borderRadius: 25,
									borderWidth: 1.0,
									borderColor: "rgb(0,0,0,0.5)",
									marginTop: 20,
									paddingInline: 10,
									background: "rgb(235, 235, 235)",
								}}
							>
								<Card.Header
									style={{
										display: "flex",
										paddingInline: 10,
										borderRadius: 25,
										marginTop: 10,
										marginBottom: 10,
										borderColor: "black",
										background: "rgba(255, 255, 255)",
									}}
								>
									<span
										style={{
											color: "black",
											textDecoration: "none",
											flex: 1,
											cursor: "pointer",
											alignSelf: "center",
											fontSize: 18,
										}}
									>
										<Accordion.Toggle as={Card.Text} variant="Link" eventKey="0">
											Patient Name : &emsp; {medicalHistory.pname}
											<br></br> Patient NIC : &emsp;&emsp; {medicalHistory.nic}
										</Accordion.Toggle>
									</span>
								</Card.Header>

								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<div>
											<h1>
												<center>
													<b>Patient Medical History Form</b>
												</center>
											</h1>
											<br />
											<h4>
												<b>Patient Details</b>
											</h4>
											<h6>Patient NIC: {medicalHistory.nic}</h6>
											<h6>Patient Name: {medicalHistory.pname}</h6>
											<hr />
											<h4>
												<b>Previous Dental History</b>
											</h4>
											<h6>{medicalHistory.previousDentalhistory}</h6>
											<hr />
											<h4>
												<b>Dental Concerns</b>
											</h4>
											<h6>{medicalHistory.dentalConcerns}</h6>
											<hr />
											<h4>
												<b>Medical Concerns</b>
											</h4>
											<h6>{medicalHistory.medicalConcerns}</h6>
											<h6>
												<b>Current Medications:</b>
											</h6>
											<h6>{medicalHistory.currentMedications}</h6>
											<hr />
											<h4>
												<b>Other Concerns</b>
											</h4>
											<h6>
												<b>About allergies or any other diseases not listed bove:</b>
											</h6>
											<h6> {medicalHistory.otherDiseases}</h6>
											<br />
											<h6>
												<b>*Confirmed Details Related to COVID-19*</b>
											</h6>
											<br />
											<h6>
												<b>Number of vaccinations the patient has received:</b>
											</h6>
											<h6>{medicalHistory.vaccinations}</h6>
											<h6>
												<b>Previously the patient has been diagnosed with COVID-19 or have had/have COVID-19:</b>
											</h6>
											<h6>{medicalHistory.covidDiagnose}</h6>
											<h6>
												<b>The patient has a fever or a cough or any other flu symptoms:</b>
											</h6>
											<h6>{medicalHistory.fluSymptoms}</h6>
											<h6>
												<b>The patient has been in contact with any person with confirmed COVID-19:</b>
											</h6>
											<h6>{medicalHistory.covidConfirmation}</h6>
										</div>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					))}
			</MainScreen>
		</div>
	);
};

export default MedicalHistoryListDoctor;
