import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authHeader } from "../../actions/patientActions";
import "./MedicalHistory.css";

function SingleMedicalHistoryPatient() {
	const [nic, setNic] = useState();
	const [pname, setPname] = useState();
	const [previousDentalhistory, setPreviousDentalhistory] = useState();
	const [dentalConcerns, setDentalConcerns] = useState();
	const [medicalConcerns, setMedicalConcerns] = useState();
	const [currentMedications, setCurrentMedications] = useState();
	const [otherDiseases, setOtherDiseases] = useState();
	const [vaccinations, setVaccinations] = useState();
	const [covidDiagnose, setCovidDiagnose] = useState();
	const [fluSymptoms, setFluSymptoms] = useState();
	const [covidConfirmation, setCovidConfirmation] = useState();

	const patient_Login = useSelector((state) => state.patient_Login);
	const { patientInfo } = patient_Login;

	useEffect(() => {
		if (patientInfo) {
			const fetching = async () => {
				const { data } = await axios.get(`/user/patient/medical_history/${patientInfo._id}`, {
					headers: authHeader(),
				});

				setNic(data.nic);
				setPname(data.pname);
				setPreviousDentalhistory(data.previousDentalhistory);
				setDentalConcerns(data.dentalConcerns);
				setMedicalConcerns(data.medicalConcerns);
				setCurrentMedications(data.currentMedications);
				setOtherDiseases(data.otherDiseases);
				setVaccinations(data.vaccinations);
				setCovidDiagnose(data.covidDiagnose);
				setFluSymptoms(data.fluSymptoms);
				setCovidConfirmation(data.covidConfirmation);
			};

			fetching();
		}
	});

	if (patientInfo) {
		return (
			<div className="medicalHistory-create-edit-Bg">
				<MainScreen title="Patient Medical History">
					<Button
						style={{
							fontSize: 15,
							marginLeft: 10,
							marginTop: 5,
						}}
						href="/patient"
					>
						{" "}
						Back to Operations Page
					</Button>

					<Card
						style={{
							marginTop: 20,
							marginLeft: "11%",
							marginRight: "38%",
							width: "80%",
							borderRadius: 18,
							background: "rgba(255, 255, 255, 0.9)",
						}}
					>
						<Card.Header
							style={{
								borderRadius: 17,
								marginLeft: 9,
								marginRight: 9,
								marginTop: 6,
							}}
						>
							<h4
								style={{
									alignSelf: "center",
									marginLeft: "32%",
									marginRight: "35%",
								}}
							>
								<b>Patient Medical History Form</b>
							</h4>
						</Card.Header>
						<Card.Body>
							<Form>
								<h6>
									<b>Patient Details</b>
								</h6>
								<Form.Group controlId="nic">
									<Form.Label>NIC</Form.Label>
									<Form.Control type="nic" value={nic} />
								</Form.Group>

								<Form.Group controlId="pname">
									<Form.Label>Patient Name</Form.Label>
									<Form.Control type="pname" value={pname} />
								</Form.Group>
								<br />
								<Form.Group controlId="previousDentalhistory">
									<Form.Label>
										<b>Previous Dental History</b>
									</Form.Label>
									<Form.Control as="textarea" value={previousDentalhistory} rows={4} />
								</Form.Group>

								<h6>
									<b>Dental Concerns</b>
								</h6>
								<Form.Group controlId="dentalConcerns">
									<Form.Label> Dental concerns you have*</Form.Label>
									<Form.Control as="textarea" value={dentalConcerns} rows={4} />
								</Form.Group>
								<h6>
									<b>Medical Concerns</b>
								</h6>
								<Form.Group controlId="medicalConcerns">
									<Form.Label> Medical concerns you have*</Form.Label>
									<Form.Control type="medicalConcerns" value={medicalConcerns} />
								</Form.Group>

								<Form.Group controlId="currentMedications">
									<Form.Label> Current Medications</Form.Label>
									<Form.Control as="textarea" value={currentMedications} rows={4} />
								</Form.Group>

								<h6>
									<b>Other Concerns</b>
								</h6>
								<Form.Group controlId="otherDiseases">
									<Form.Label>Allergies and diseases not listed above</Form.Label>
									<Form.Control as="textarea" value={otherDiseases} rows={4} />
								</Form.Group>

								<h6>
									<b>* Required Patient Information , Due to COVID-19 pandemic *</b>
								</h6>
								<Form.Group controlId="vaccinations">
									<Form.Label>Number of vaccinations the patient have received against COVID-19</Form.Label>
									<Form.Control type="vaccinations" value={vaccinations} />
								</Form.Group>

								<Form.Group controlId="covidDiagnose">
									<Form.Label>The patient has been diagnosed with COVID-19</Form.Label>
									<Form.Control type="covidDiagnose" value={covidDiagnose} />
								</Form.Group>

								<Form.Group controlId="fluSymptoms">
									<Form.Label>The patient is haveing a fever or a cough or any other flu symptoms</Form.Label>
									<Form.Control type="fluSymptoms" value={fluSymptoms} />
								</Form.Group>

								<Form.Group controlId="covidConfirmation">
									<Form.Label>The patient has been in contact with any person with confirmed COVID-19</Form.Label>
									<Form.Control type="covidConfirmation" value={covidConfirmation} />
								</Form.Group>

								<br />
							</Form>
						</Card.Body>
					</Card>
					<br />
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
}

export default SingleMedicalHistoryPatient;
