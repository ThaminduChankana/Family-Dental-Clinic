import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createMedicalHistoryAction } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function MedicalHistoryCreate({ history }) {
	const [nic, setNic] = useState("");
	const [pname, setPname] = useState("");
	const [previousDentalhistory, setPreviousDentalhistory] = useState("");
	const [dentalConcerns, setDentalConcerns] = useState("");
	const [medicalConcerns, setMedicalConcerns] = useState("");
	const [currentMedications, setCurrentMedications] = useState("");
	const [otherDiseases, setOtherDiseases] = useState("");
	const [vaccinations, setVaccinations] = useState("");
	const [covidDiagnose, setCovidDiagnose] = useState("");
	const [fluSymptoms, setFluSymptoms] = useState("");
	const [covidConfirmation, setCovidConfirmation] = useState("");

	const dispatch = useDispatch();

	const medicalHistoryCreate = useSelector((state) => state.medicalHistoryCreate);

	const { loading, error, medicalHistory } = medicalHistoryCreate;

	console.log(medicalHistory);

	const resetHandler = () => {
		setNic("");
		setPname("");
		setPreviousDentalhistory("");
		setDentalConcerns("");
		setMedicalConcerns("");
		setCurrentMedications("");
		setOtherDiseases("");
		setVaccinations("");
		setCovidDiagnose("");
		setFluSymptoms("");
		setCovidConfirmation("");
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (
			!nic ||
			!pname ||
			!previousDentalhistory ||
			!dentalConcerns ||
			!medicalConcerns ||
			!currentMedications ||
			!otherDiseases ||
			!vaccinations ||
			!covidDiagnose ||
			!fluSymptoms ||
			!covidConfirmation
		)
			return;
		dispatch(
			createMedicalHistoryAction(
				nic,
				pname,
				previousDentalhistory,
				dentalConcerns,
				medicalConcerns,
				currentMedications,
				otherDiseases,
				vaccinations,
				covidDiagnose,
				fluSymptoms,
				covidConfirmation
			)
		);

		resetHandler();
		history.push("/admin-medical-history");
	};

	return (
		<MainScreen title="Create New Form...">
			<Card>
				<Card.Header>
					<h4>
						<b>Patient Medical History Form</b>
					</h4>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={submitHandler}>
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						<h6>
							<b>Patient Details</b>
						</h6>
						<Form.Group controlId="nic">
							<Form.Label>NIC</Form.Label>
							<Form.Control
								type="nic"
								value={nic}
								placeholder="Enter the NIC"
								onChange={(e) => setNic(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="pname">
							<Form.Label>Patient Name</Form.Label>
							<Form.Control
								type="pname"
								value={pname}
								placeholder="Enter the Patient Name"
								onChange={(e) => setPname(e.target.value)}
							/>
						</Form.Group>
						<br />
						<Form.Group controlId="previousDentalhistory">
							<Form.Label>
								<b>Previous Dental History</b>
							</Form.Label>
							<Form.Control
								as="textarea"
								value={previousDentalhistory}
								placeholder="Enter the previous dental history"
								rows={4}
								onChange={(e) => setPreviousDentalhistory(e.target.value)}
							/>
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
							<Form.Control
								as="textarea"
								value={dentalConcerns}
								placeholder="Enter the dental concerns"
								rows={4}
								onChange={(e) => setDentalConcerns(e.target.value)}
							/>
						</Form.Group>
						<br />
						<h6>
							<b>Medical Concerns</b>
						</h6>
						<Form.Group controlId="medicalConcerns">
							<Form.Label>Please list any medical concerns you have*</Form.Label>
							<Form.Control
								as="textarea"
								value={medicalConcerns}
								placeholder="Enter the medical concerns"
								rows={4}
								onChange={(e) => setMedicalConcerns(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="currentMedications">
							<Form.Label>Please list your Current Medications</Form.Label>
							<Form.Control
								as="textarea"
								value={currentMedications}
								placeholder="Enter the Current Medications"
								rows={4}
								onChange={(e) => setCurrentMedications(e.target.value)}
							/>
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
							<Form.Control
								as="textarea"
								value={otherDiseases}
								placeholder="Enter the allergies or diseases"
								rows={4}
								onChange={(e) => setOtherDiseases(e.target.value)}
							/>
						</Form.Group>

						{otherDiseases && (
							<Card>
								<Card.Header>Allergies or other diseases Preview</Card.Header>
								<Card.Body>
									<ReactMarkdown>{otherDiseases}</ReactMarkdown>
								</Card.Body>
							</Card>
						)}

						<h6>
							<b>* Due to COVID-19 pandemic , We ask you to fill out questions in below *</b>
						</h6>
						<Form.Group controlId="vaccinations">
							<Form.Label>Number of vaccinations the patient have received against COVID-19 ?</Form.Label>
							<Form.Control
								type="vaccinations"
								value={vaccinations}
								placeholder="Enter number of vaccinations"
								onChange={(e) => setVaccinations(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="covidDiagnose">
							<Form.Label>
								Have you previously been diagnosed with COVID-19 or do you think you have had/have COVID-19?
							</Form.Label>
							<Form.Control
								type="covidDiagnose"
								value={covidDiagnose}
								placeholder="Enter yes or no"
								onChange={(e) => setCovidDiagnose(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="fluSymptoms">
							<Form.Label>Do you have a fever or a cough or any other flu symptoms?</Form.Label>
							<Form.Control
								type="fluSymptoms"
								value={fluSymptoms}
								placeholder="Enter yes or no"
								onChange={(e) => setFluSymptoms(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="covidConfirmation">
							<Form.Label>Have you been in contact with any person with confirmed COVID-19? </Form.Label>
							<Form.Control
								type="covidConfirmation"
								value={covidConfirmation}
								placeholder="Enter yes or no"
								onChange={(e) => setCovidConfirmation(e.target.value)}
							/>
						</Form.Group>

						<hr />
						<br />
						{loading && <Loading size={50} />}
						<Button type="submit" variant="primary">
							Create Form
						</Button>
						<Button className="mx-2" onClick={resetHandler} variant="danger">
							Reset Feilds
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</MainScreen>
	);
}

export default MedicalHistoryCreate;
