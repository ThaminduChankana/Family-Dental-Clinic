import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasicTreatmentAction, updateBasicTreatmentAction } from "../../../actions/basicTreatmentAction";
import ErrorMessage from "../../../components/ErrorMessage";
import Loading from "../../../components/Loading";
import { authHeader } from "../../../actions/doctorActions";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";

export default function SingleBasicTreatment({ match, history }) {
	const [nic, setNic] = useState();
	const [cost, setCost] = useState();
	const [treatmentType, setTreatmentType] = useState();
	const [date, setDate] = useState("");
	const [checkup, setCheckup] = useState();
	const [procedure, setProcedure] = useState();
	const [remark, setRemark] = useState("");

	const dispatch = useDispatch();

	const basicTreatmentUpdate = useSelector((state) => state.basicTreatmentUpdate);
	const { loading, error } = basicTreatmentUpdate;

	const basicTreatmentDelete = useSelector((state) => state.basicTreatmentDelete);
	const { loading: loadingDelete, error: errorDelete } = basicTreatmentDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteBasicTreatmentAction(id));
		}
		history.push("/treatment-dashboard");
	};
	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(
				`http://localhost:5000/user/doctor/treatment/basic_treatment/get/${match.params.id}`,
				{
					headers: authHeader(),
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": true,
				}
			);

			setNic(data.nic);
			setCost(data.cost);
			setTreatmentType(data.treatmentType);
			setDate(data.date);
			setCheckup(data.checkup);
			setProcedure(data.procedure);
			setRemark(data.remark);
		};

		fetching();
	}, [match.params.id, date]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateBasicTreatmentAction(match.params.id, nic, cost, treatmentType, date, checkup, procedure, remark));
		if (!nic || !cost || !treatmentType || !date || !checkup || !procedure || !remark) return;

		history.push("/treatment-basicTreatment-view");
		alert("Successfully Updated");
	};

	return (
		<div>
			<TreatmentNavBar />
			<Card style={{ margin: 50, left: "30%", width: "40%" }}>
				<Card.Header>Update Diagnosis Card For Basic Treatment</Card.Header>
				<Card.Body>
					<Form onSubmit={updateHandler}>
						{loadingDelete && <Loading />}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
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
								placeholder="Enter the Cost"
								rows={4}
								onChange={(e) => setCost(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group controlId="treatmentType">
							<Form.Label>Treatment Type</Form.Label>
							<Form.Control
								type="treatmentType"
								value={treatmentType}
								placeholder="Enter the Treatment Type"
								onChange={(e) => setTreatmentType(e.target.value)}
								required
							/>
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
						<Button style={{ width: "30%" }} type="submit" variant="primary">
							Submit
						</Button>
						<Button
							style={{ width: "30%" }}
							className="mx-2"
							variant="danger"
							onClick={() => deleteHandler(match.params.id)}
						>
							Delete
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
}
