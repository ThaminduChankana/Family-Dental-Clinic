import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBasicTreatmentAction } from "../../../actions/basicTreatmentAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";
import MainScreen from "../../../components/MainScreen";
import "./treatmentCreate.css";

export default function BasicTreatmentCreate({ history }) {
	const [nic, setNic] = useState("");
	const [cost, setCost] = useState("");
	const [treatmentType, setTreatmentType] = useState("Paedodontics");
	const [date, setDate] = useState("");
	const [checkup, setCheckup] = useState("");
	const [procedure, setProcedure] = useState("");
	const [remark, setRemark] = useState("");

	const dispatch = useDispatch();
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;

	const basicTreatmentCreate = useSelector((state) => state.basicTreatmentCreate);
	const { loading, error } = basicTreatmentCreate;

	const resetHandler = () => {
		setNic("");
		setCost("");
		setTreatmentType("");
		setDate("");
		setCheckup("");
		setProcedure("");
		setRemark("");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(createBasicTreatmentAction(nic, cost, treatmentType, date, checkup, procedure, remark));

		resetHandler();
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setNic("196875612V");
		setCost("8000.00");
		setCheckup("No matter in the x-ray");
		setProcedure("Need to remove dead tissues around 2-4");
		setRemark("No");
	};

	useEffect(() => {}, []);
	if (doctorInfo) {
		return (
			<div className="basicCreate">
				<MainScreen title="DOCTOR CREATE - BASIC TREATMENT">
					<br></br>
					<TreatmentNavBar />
					<Card
						style={{
							margin: 50,
							width: "80%",
							marginLeft: "10%",
							borderRadius: 45,
							borderWidth: 2.0,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<Card.Body>
							<br></br>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
								<Form.Group controlId="cost">
									<Form.Label>Cost</Form.Label>
									<Form.Control
										value={cost}
										type="number"
										placeholder="Enter the Cost"
										rows={4}
										onChange={(e) => setCost(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="treatmentType">
									<Form.Label>Treatment Type</Form.Label>
									<br />
									<select
										style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#808080", borderWidth: 0.5 }}
										onChange={(e) => setTreatmentType(e.target.value)}
									>
										<option value="Paedodontics">Paedodontics</option>
										<option value="Dentures">Dentures</option>
										<option value="Extraction">Extraction</option>
										<option value="Oral heigene">Oral heigene</option>
										<option value="Full Mouth Scaling ">Full mouth scaling </option>
									</select>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label>Date</Form.Label>
									<Form.Control
										type="date"
										value={date}
										placeholder="Enter the date"
										onChange={(e) => setDate(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="checkup">
									<Form.Label>Checkup</Form.Label>
									<Form.Control
										as="textarea"
										type="checkup"
										value={checkup}
										placeholder="Enter the Checkup"
										onChange={(e) => setCheckup(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="procedure">
									<Form.Label>Procedure</Form.Label>
									<Form.Control
										as="textarea"
										type="procedure"
										value={procedure}
										placeholder="Enter the Procedure"
										onChange={(e) => setProcedure(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="remark">
									<Form.Label>Remark</Form.Label>
									<Form.Control
										as="textarea"
										type="reamark"
										value={remark}
										placeholder="Enter the Remark"
										onChange={(e) => setRemark(e.target.value)}
									/>
								</Form.Group>
								{loading && <Loading size={50} />}
								<Button style={{ fontSize: 15, marginTop: 10 }} type="submit" variant="primary">
									Submit
								</Button>
								<Button
									style={{ fontSize: 15, marginTop: 10 }}
									className="mx-2"
									onClick={resetHandler}
									variant="danger"
								>
									Reset
								</Button>
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
						<br></br>
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
