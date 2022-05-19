import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createFillingAction } from "../../../actions/fillingAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";

export default function FillingCreate({ history }) {
	const [nic, setNic] = useState("");
	const [cost, setCost] = useState("");
	const [anestheticStatus, setAnestheticStatus] = useState("");
	const [fillingMaterial, setFillingMaterial] = useState("");
	const [fillingType, setFillingType] = useState("");
	const [date, setDate] = useState("");
	const [checkup, setCheckup] = useState("");
	const [procedure, setProcedure] = useState("");
	const [remark, setRemark] = useState("");

	const dispatch = useDispatch();

	const fillingCreate = useSelector((state) => state.fillingCreate);
	const { loading, error, filling } = fillingCreate;

	console.log(filling);

	const resetHandler = () => {
		setNic("");
		setCost("");
		setAnestheticStatus("");
		setDate("");
		setCheckup("");
		setCheckup("");
		setProcedure("");
		setRemark("");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (
			!nic ||
			!cost ||
			!anestheticStatus ||
			!fillingMaterial ||
			!fillingType ||
			!date ||
			!checkup ||
			!procedure ||
			!remark
		)
			return;
		dispatch(
			createFillingAction(nic, cost, anestheticStatus, fillingMaterial, fillingType, date, checkup, procedure, remark)
		);

		resetHandler();
		history.push("/treatment-filling-view");
	};

	useEffect(() => {}, []);
	return (
		<div>
			<br />
			<br />
			<TreatmentNavBar />
			<br />
			<br />
			<h1
				style={{
					display: "flex",
					marginLeft: "40%",
					width: "500px",
				}}
			>
				Create Filling Treatment
			</h1>
			<Card
				style={{
					margin: 50,
					left: "28%",
					width: "40%",
					borderRadius: 45,
					borderWidth: 2.0,
					background: "rgba(231, 238, 238, 0.8)",
				}}
			>
				<Card.Body>
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
						<Form.Group controlId="anestheticStatus">
							<Form.Label>Anesthetic Status</Form.Label>
							<Form.Control
								as="textarea"
								type="anestheticStatus"
								value={anestheticStatus}
								placeholder="Enter the Anesthetic Status"
								onChange={(e) => setAnestheticStatus(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="fillingMaterial">
							<Form.Label>Filling Material</Form.Label>
							<br />
							<select
								style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#808080", borderWidth: 0.5 }}
								onChange={(e) => setFillingMaterial(e.target.value)}
							>
								<option value="Filling Material">Filling Material</option>
								<option value="Gold">Gold</option>
								<option value="Porcelain">Porcelain</option>
								<option value="Silver Amalgam">Silver Amalgam</option>
								<option value="Composite Resin">Composite Resin</option>
							</select>
						</Form.Group>
						<Form.Group controlId="fillingType">
							<Form.Label>Filling Type</Form.Label>
							<br />
							<select
								style={{ height: "35px", width: "100%", borderRadius: 5, borderColor: "#808080", borderWidth: 0.5 }}
								onChange={(e) => setFillingType(e.target.value)}
							>
								<option value="Filling Type">Filling Type</option>
								<option value="Direct">Direct</option>
								<option value="Indirect">Indirect</option>
							</select>
						</Form.Group>
						<Form.Group controlId="date">
							<Form.Label>Date</Form.Label>
							<Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
								required
							/>
						</Form.Group>
						{loading && <Loading size={50} />}
						<Button style={{ width: "20%" }} type="submit" variant="primary">
							Submit
						</Button>
						<Button style={{ width: "20%" }} className="mx-2" onClick={resetHandler} variant="danger">
							Reset
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
