import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMedicalHistoriesforDoctor } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MedicalHistoryListDoctor = () => {
	const dispatch = useDispatch();

	const medicalHistoryListDoctor = useSelector((state) => state.medicalHistoryListDoctor);
	const { loading, medicalHistories, error } = medicalHistoryListDoctor;

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	console.log(medicalHistories);

	const history = useHistory();

	useEffect(() => {
		dispatch(listMedicalHistoriesforDoctor());
		if (!doctorInfo) {
			history.push("/");
		}
	}, [dispatch, history, doctorInfo]);

	return (
		<MainScreen title={`Patients' Medical History`}>
			<h1
				style={{
					display: "flex",
					marginLeft: "10px",
					width: "500px",
				}}
			>
				{doctorInfo && doctorInfo.name}
			</h1>
			<br />

			{error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
			{loading && <Loading />}
			{medicalHistories?.reverse().map((medicalHistory) => (
				<Accordion key={medicalHistory._id}>
					<Card style={{ margin: 10 }}>
						<Card.Header style={{ display: "flex" }}>
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
								</Accordion.Toggle>
							</span>
						</Card.Header>

						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div>
									<h1>
										<center>
											<Badge variant="success">Patient Medical History Form</Badge>
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
	);
};

export default MedicalHistoryListDoctor;
