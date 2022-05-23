import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicalHistoryAction, updateMedicalHistoryAction } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { authHeader } from "../../actions/adminActions";
import "./MedicalHistory.css";
import swal from "sweetalert";

function SingleMedicalHistory({ match, history }) {
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

	const medicalHistoryUpdate = useSelector((state) => state.medicalHistoryUpdate);
	const { loading, error } = medicalHistoryUpdate;

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const medicalHistoryDelete = useSelector((state) => state.medicalHistoryDelete);
	const { loading: loadingDelete, error: errorDelete } = medicalHistoryDelete;

	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteMedicalHistoryAction(id));
					swal({
						title: "Success!",
						text: "Medical History Deleted Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Medical History",
					type: "error",
				});
			});

		history.push("/admin-medical-history");
	};

	useEffect(() => {
		if (adminInfo != null) {
			const fetching = async () => {
				const { data } = await axios.get(`/user/admin/medical_history/${match.params.id}`, {
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
	}, [match.params.id, adminInfo]);

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

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateMedicalHistoryAction(
				match.params.id,
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

		resetHandler();
		history.push("/admin-medical-history");
	};

	if (adminInfo) {
		return (
			<div className="medicalHistory-create-edit-Bg">
				<MainScreen title="Edit Form...">
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
							<Form onSubmit={updateHandler}>
								{loadingDelete && <Loading />}
								{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
									<Form.Label>Select the medical concerns you have*</Form.Label>
									<Form.Control
										type="medicalConcerns"
										value={medicalConcerns}
										placeholder="Enter the medical concerns"
										onChange={(e) => setMedicalConcerns(e.target.value)}
										required
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
									<Form.Control
										type="vaccinations"
										value={vaccinations}
										placeholder="Enter number of vaccinations"
										onChange={(e) => setVaccinations(e.target.value)}
										required
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
								<br />
								{loading && <Loading size={50} />}
								<Button type="submit" variant="primary">
									Update Form
								</Button>
								<Button className="mx-2" variant="danger" onClick={() => deleteHandler(match.params.id)}>
									Delete Form
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

export default SingleMedicalHistory;
