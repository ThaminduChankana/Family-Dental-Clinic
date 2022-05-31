import React, { useEffect } from "react";
import { Accordion, Button, ButtonGroup, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicalHistoryAction, listMedicalHistories } from "../../actions/medicalHistoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./MedicalHistory.css";
import swal from "sweetalert";

const MedicalHistory = ({ search }) => {
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
	};

	const history = useHistory();

	useEffect(() => {
		dispatch(listMedicalHistories());
	}, [dispatch, successCreate, history, adminInfo, successUpdate, successDelete]);

	if (adminInfo) {
		return (
			<div className="medicalHistoryBg">
				<MainScreen title={`Welcome back ${adminInfo && adminInfo.name} ..`}>
					<h1
						style={{
							display: "flex",
							marginLeft: "10px",
							width: "500px",
						}}
					>
						Patients' Medical History
					</h1>

					<br></br>
					<ButtonGroup className="mb-2" size="lg" style={{ width: "100%" }}>
						<Button href="/admin">Back to operations page</Button>

						<Button href="/admin-create-medical-history">+ Create a New Form</Button>

						<Button href="/medical_history/report">Generate Medical History Report</Button>
					</ButtonGroup>

					<br></br>

					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
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
										<div>
											<Button
												style={{ marginTop: 10, fontSize: 15 }}
												href={`/admin-single-medical-history/${medicalHistory._id}`}
											>
												Edit
											</Button>
											<Button
												style={{ marginTop: 10, fontSize: 15 }}
												variant="danger"
												className="mx-2"
												onClick={() => deleteHandler(medicalHistory._id)}
											>
												Delete
											</Button>
										</div>
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

export default MedicalHistory;
