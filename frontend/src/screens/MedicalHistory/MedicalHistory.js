import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicalHistoryAction, listMedicalHistories } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MedicalHistory = () => {
	const dispatch = useDispatch();

	const medicalHistoryList = useSelector((state) => state.medicalHistoryList);

	const { loading, medicalHistories, error } = medicalHistoryList;

	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;

	const medicalHistoryCreate = useSelector((state) => state.medicalHistoryCreate);
	const { success: successCreate } = medicalHistoryCreate;

	const medicalHistoryUpdate = useSelector((state) => state.medicalHistoryUpdate);
	const { success: successUpdate } = medicalHistoryUpdate;

	const medicalHistoryDelete = useSelector((state) => state.medicalHistoryDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = medicalHistoryDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure, Do you want to delete it?")) {
			dispatch(deleteMedicalHistoryAction(id));
		}
	};

	console.log(medicalHistories);

	const history = useHistory();

	useEffect(() => {
		dispatch(listMedicalHistories());
		if (!adminInfo) {
			history.push("/");
		}
	}, [dispatch, successCreate, history, adminInfo, successUpdate, successDelete]);

	return (
		<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
			<h1
				style={{
					display: "flex",
					marginLeft: "10px",
					width: "500px",
				}}
			>
				Patients' Medical History
			</h1>
			<br />

			<Link to="/admin-create-medical-history">
				<Button style={{ marginLeft: 10, marginBottem: 6 }} size="lg">
					Create a New Form
				</Button>
				<br />
			</Link>

			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
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
							<div>
								<Button href={`/admin-single-medical-history/${medicalHistory._id}`}>Edit</Button>
								<Button variant="danger" className="mx-2" onClick={() => deleteHandler(medicalHistory._id)}>
									Delete
								</Button>
							</div>
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

export default MedicalHistory;
