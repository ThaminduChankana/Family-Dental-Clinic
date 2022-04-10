import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteFillingAction, updateFillingAction } from "../../actions/fillingAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

export default function SingleFilling({ match, history }) {
	const [nic, setNic] = useState();
	const [cost, setCost] = useState();
	const [fillingMaterial, setFillingMaterial] = useState();
	const [fillingType, setFillingType] = useState("");
	const [anestheticStatus, setAnestheticStatus] = useState();
	const [date, setDate] = useState("");
	const [checkup, setCheckup] = useState();
	const [procedure, setProcedure] = useState();
	const [remark, setRemark] = useState("");

	const dispatch = useDispatch();

	const fillingUpdate = useSelector((state) => state.fillingUpdate);
	const { loading, error } = fillingUpdate;

	const fillingDelete = useSelector((state) => state.fillingDelete);
	const { loading: loadingDelete, error: errorDelete } = fillingDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteFillingAction(id));
		}
		history.push("/treatment-dashboard");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/doctor/treatment/filling/get/${match.params.id}`);

			setNic(data.nic);
			setCost(data.cost);
			setFillingMaterial(data.fillingMaterial);
			setFillingType(data.fillingType);
			setAnestheticStatus(data.anestheticStatus);
			setDate(data.date);
			setCheckup(data.checkup);
			setProcedure(data.procedure);
			setRemark(data.remark);
		};

		fetching();
	}, [match.params.id, date]);

	// const resetHandler = () => {
	// 	setNic("");
	// 	setCost("");
	// 	setTreatmentType("");
	// 	setDate("");
	// 	setCheckup("");
	// 	setProcedure("");
	// 	setRemark("");
	// };

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateFillingAction(
				match.params.id,
				nic,
				cost,
				anestheticStatus,
				fillingMaterial,
				fillingType,
				date,
				checkup,
				procedure,
				remark
			)
		);
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

		history.push("/treatment-dashboard");
	};
	return (
		<Card>
			<Card.Header>Updtate Diagnosis Card For Filling Treatment</Card.Header>
			<Card.Body>
				<Form onSubmit={updateHandler}>
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					<Form.Group controlId="nic">
						<Form.Label>NIC</Form.Label>
						<Form.Control type="nic" value={nic} placeholder="Enter the NIC" onChange={(e) => setNic(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="cost">
						<Form.Label>Cost</Form.Label>
						<Form.Control
							value={cost}
							placeholder="Enter the Cost"
							rows={4}
							onChange={(e) => setCost(e.target.value)}
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
						/>
					</Form.Group>
					<Form.Group controlId="fillingMaterial">
						<Form.Label>Filling Material</Form.Label>
						<Form.Control
							type="fillingMaterial"
							value={fillingMaterial}
							placeholder="Enter the Filling Material"
							onChange={(e) => setFillingMaterial(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="fillingType">
						<Form.Label>Filling Type</Form.Label>
						<Form.Control
							type="fillingType"
							value={fillingType}
							placeholder="Enter the Filling Type"
							onChange={(e) => setFillingType(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="date">
						<Form.Label>Date</Form.Label>
						<Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
					</Form.Group>
					<Form.Group controlId="checkup">
						<Form.Label>Checkup</Form.Label>
						<Form.Control
							as="textarea"
							type="checkup"
							value={checkup}
							placeholder="Enter the Checkup"
							onChange={(e) => setCheckup(e.target.value)}
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
					<Button type="submit" variant="primary">
						Submit
					</Button>
					<Button className="mx-2" variant="danger" onClick={() => deleteHandler(match.params.id)}>
						Delete
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
