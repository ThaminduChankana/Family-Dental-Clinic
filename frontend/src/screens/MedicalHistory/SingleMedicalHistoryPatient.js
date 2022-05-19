import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { patientViewMedicalHistoryAction } from "../../actions/medicalHistoryAction";
import ReactMarkdown from "react-markdown";
import { authHeader } from "../../actions/patientActions";

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

	const dispatch = useDispatch();

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

				console.log(data);
			};

			fetching();
		}
	}, [patientInfo._id]);

	return (
		<MainScreen title="Patient Medical History">
			<Button
				style={{
					float: "left",
					marginTop: 5,
					fontSize: 15,
					marginLeft: 10,
				}}
				href="/patient"
			>
				{" "}
				Back
			</Button>
			<Card>
				<Card.Header>
					<h4>
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

						{previousDentalhistory && (
							<Card>
								<Card.Header>Dental History Preview</Card.Header>
								<Card.Body>
									<ReactMarkdown>{previousDentalhistory}</ReactMarkdown>
								</Card.Body>
							</Card>
						)}
						<br />
						<h6>
							<b>Dental Concerns</b>
						</h6>
						<Form.Group controlId="dentalConcerns">
							<Form.Label>Please list any dental concerns you have*</Form.Label>
							<Form.Control as="textarea" value={dentalConcerns} rows={4} />
						</Form.Group>
						<br />
						<h6>
							<b>Medical Concerns</b>
						</h6>
						<Form.Group controlId="medicalConcerns">
							<Form.Label>Please list any medical concerns you have*</Form.Label>
							<Form.Control as="textarea" value={medicalConcerns} rows={4} />
						</Form.Group>

						<Form.Group controlId="currentMedications">
							<Form.Label>Please list your Current Medications</Form.Label>
							<Form.Control as="textarea" value={currentMedications} rows={4} />
						</Form.Group>

						{currentMedications && (
							<Card>
								<Card.Header>Current Medications Preview</Card.Header>
								<Card.Body>
									<ReactMarkdown>{currentMedications}</ReactMarkdown>
								</Card.Body>
							</Card>
						)}
						<br />
						<h6>
							<b>Other Concerns</b>
						</h6>
						<Form.Group controlId="otherDiseases">
							<Form.Label>Do you have any allergies or diseases not listed above?</Form.Label>
							<Form.Control as="textarea" value={otherDiseases} rows={4} />
						</Form.Group>

						{otherDiseases && (
							<Card>
								<Card.Header>Allergies or other diseases Preview</Card.Header>
								<Card.Body>
									<ReactMarkdown>{otherDiseases}</ReactMarkdown>
								</Card.Body>
							</Card>
						)}
						<br />
						<h6>
							<b>* Due to COVID-19 pandemic , We ask you to fill out questions in below *</b>
						</h6>
						<Form.Group controlId="vaccinations">
							<Form.Label>Number of vaccinations the patient have received against COVID-19 ?</Form.Label>
							<Form.Control type="vaccinations" value={vaccinations} />
						</Form.Group>

						<Form.Group controlId="covidDiagnose">
							<Form.Label>
								Have you previously been diagnosed with COVID-19 or do you think you have had/have COVID-19?
							</Form.Label>
							<Form.Control type="covidDiagnose" value={covidDiagnose} />
						</Form.Group>

						<Form.Group controlId="fluSymptoms">
							<Form.Label>Do you have a fever or a cough or any other flu symptoms?</Form.Label>
							<Form.Control type="fluSymptoms" value={fluSymptoms} />
						</Form.Group>

						<Form.Group controlId="covidConfirmation">
							<Form.Label>Have you been in contact with any person with confirmed COVID-19? </Form.Label>
							<Form.Control type="covidConfirmation" value={covidConfirmation} />
						</Form.Group>
						<hr />
						<br />
					</Form>
				</Card.Body>
			</Card>
		</MainScreen>
	);
}

export default SingleMedicalHistoryPatient;
