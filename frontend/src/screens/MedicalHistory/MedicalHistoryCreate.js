import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMedicalHistoryAction } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./MedicalHistory.css";

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

	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;

	const { loading, error } = medicalHistoryCreate;

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

	const demoHandler = async (e) => {
		e.preventDefault();

		setNic("3007");
		setPname("A.K.Perera");
		setPreviousDentalhistory("Last Cleaning: 2022-02-04");
		setDentalConcerns("toothache");
		setCurrentMedications("Vicodin (hydrocodone/acetaminophen)");
		setOtherDiseases("grass and tree pollen – an allergy to these is known as hay fever (allergic rhinitis)");
		setCovidDiagnose("no");
		setFluSymptoms("no");
		setCovidConfirmation("no");
	};

	if (adminInfo) {
		return (
			<div className="medicalHistory-create-edit-Bg">
				<MainScreen title="Create New Form...">
					<Link to="/admin-medical-history">
						<Button
							style={{
								fontSize: 15,
								marginLeft: 10,
								marginTop: 5,
							}}
						>
							Back to Patients' medical History
						</Button>
					</Link>
					<br />
					<br />
					<Card
						style={{
							marginTop: 20,
							marginLeft: "11%",
							marginRight: "38%",
							width: "80%",
							borderRadius: 18,
							background: "rgba(255, 255, 255, 0.9)",
							marginBottom: 60,
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
										required
									/>
								</Form.Group>
								<Form.Group controlId="pname">
									<Form.Label>Patient Name</Form.Label>
									<Form.Control
										type="pname"
										value={pname}
										placeholder="Enter the Patient Name"
										onChange={(e) => setPname(e.target.value)}
										required
									/>
								</Form.Group>
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
										required
									/>
								</Form.Group>
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
										required
									/>
								</Form.Group>
								<h6>
									<b>Medical Concerns</b>
								</h6>
								<Form.Group controlId="medicalConcerns">
									<Form.Label>Select the medical concern you have*</Form.Label>
									<br />
									<select
										style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#808080", borderWidth: 0.5 }}
										onChange={(e) => setMedicalConcerns(e.target.value)}
									>
										<option value="Medical Concerns">Medical Concerns</option>
										<option value="High blood pressure">High blood pressure</option>
										<option value="Heart disease">Heart Disease</option>
										<option value="Diabetes">Diabetes</option>
									</select>
								</Form.Group>
								<Form.Group controlId="currentMedications">
									<Form.Label>Please list your Current Medications</Form.Label>
									<Form.Control
										as="textarea"
										value={currentMedications}
										placeholder="Enter the Current Medications"
										rows={4}
										onChange={(e) => setCurrentMedications(e.target.value)}
										required
									/>
								</Form.Group>
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
										required
									/>
								</Form.Group>
								<h6>
									<b>* Due to COVID-19 pandemic , We ask you to fill out questions in below *</b>
								</h6>
								<Form.Group controlId="vaccinations">
									<Form.Label>Number of vaccinations the patient have received against COVID-19 ?</Form.Label>
									<br />
									<select
										style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#808080", borderWidth: 0.5 }}
										onChange={(e) => setVaccinations(e.target.value)}
									>
										<option value="Number of Vaccinations">Number of Vaccinations</option>
										<option value="No Vaccinations">No Vaccinations</option>
										<option value="1 Vaccination">1 Vaccination</option>
										<option value="2 Vaccinations">2 Vaccinations</option>
										<option value="3 Vaccinations">3 Vaccinations</option>
									</select>
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
										required
									/>
								</Form.Group>
								<Form.Group controlId="fluSymptoms">
									<Form.Label>Do you have a fever or a cough or any other flu symptoms?</Form.Label>
									<Form.Control
										type="fluSymptoms"
										value={fluSymptoms}
										placeholder="Enter yes or no"
										onChange={(e) => setFluSymptoms(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="covidConfirmation">
									<Form.Label>Have you been in contact with any person with confirmed COVID-19? </Form.Label>
									<Form.Control
										type="covidConfirmation"
										value={covidConfirmation}
										placeholder="Enter yes or no"
										onChange={(e) => setCovidConfirmation(e.target.value)}
										required
									/>
								</Form.Group>
								<hr />
								<br />
								{loading && <Loading size={50} />}
								<Button
									variant="primary"
									type="submit"
									style={{
										fontSize: 15,
										marginTop: 10,
									}}
								>
									Create Form
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
									Reset Fields
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
						</Card.Body>
					</Card>
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

export default MedicalHistoryCreate;
