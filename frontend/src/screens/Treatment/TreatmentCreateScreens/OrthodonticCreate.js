import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrthodonticAction } from "../../../actions/orthodonticAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";

export default function OrthodonticCreate({ history }) {
	const [nic, setNic] = useState("");
	const [firstVisit, setFirstVisit] = useState("");
	const [fullCost, setFullCost] = useState("");
	const [paid, setPaid] = useState("");
	const [facialExamination, setFacialExamination] = useState("");
	const [followUpVisits, setFollowUpVisits] = useState("");
	const [remark, setRemark] = useState("");

	const dispatch = useDispatch();

	const orthodonticCreate = useSelector((state) => state.orthodonticCreate);
	const { loading, error, orthodontic } = orthodonticCreate;

	console.log(orthodontic);

	const resetHandler = () => {
		setNic("");
		setFirstVisit("");
		setFullCost("");
		setPaid("");
		setFacialExamination("");
		setFollowUpVisits("");
		setRemark("");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!nic || !firstVisit || !fullCost || !paid || !facialExamination || !followUpVisits || !remark) return;
		dispatch(createOrthodonticAction(nic, firstVisit, fullCost, paid, facialExamination, followUpVisits, remark));

		resetHandler();
		history.push("/treatment-orthodontic-view");
		alert("Successfully Created");
	};

	useEffect(() => {}, []);
	return (
		<div>
			<TreatmentNavBar />
			<Card style={{ margin: 50, left: "30%", width: "40%" }}>
				<Card.Header>Diagnosis Card For Orthodontic Treatment</Card.Header>
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

						<Form.Group controlId="firstVisit">
							<Form.Label>First Visit Date</Form.Label>
							<Form.Control
								type="date"
								value={firstVisit}
								rows={4}
								onChange={(e) => setFirstVisit(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="fullCost">
							<Form.Label>Full Cost</Form.Label>
							<Form.Control
								type="number"
								value={fullCost}
								placeholder="Enter the Full Cost"
								onChange={(e) => setFullCost(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="paid">
							<Form.Label>Paid</Form.Label>
							<Form.Control
								value={paid}
								type="number"
								placeholder="Enter the Paid"
								onChange={(e) => setPaid(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="facialExamination">
							<Form.Label>Facial Examination</Form.Label>
							<Form.Control
								as="textarea"
								type="facialExamination"
								value={facialExamination}
								placeholder="Enter the Facial Examination"
								onChange={(e) => setFacialExamination(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="followUpVisits">
							<Form.Label>FollowUp Visits</Form.Label>
							<Form.Control
								as="textarea"
								type="followUpVisits"
								value={followUpVisits}
								placeholder="Enter the FollowUp Visits"
								onChange={(e) => setFollowUpVisits(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="remark">
							<Form.Label>Remark</Form.Label>
							<Form.Control
								as="textarea"
								type="remark"
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
