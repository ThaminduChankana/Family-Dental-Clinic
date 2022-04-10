import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrthodonticAction, updateOrthodonticAction } from "../../actions/orthodonticAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";

export default function SingleOrthodontic({ match, history }) {
	const [nic, setNic] = useState();
	const [firstVisit, setFirstVisit] = useState();
	const [fullCost, setFullCost] = useState("");
	const [paid, setPaid] = useState();
	const [facialExamination, setFacialExamination] = useState();
	const [followUpVisits, setFollowUpVisits] = useState();
	const [remark, setRemark] = useState("");

	const dispatch = useDispatch();

	const orthodonticUpdate = useSelector((state) => state.orthodonticUpdate);
	const { loading, error } = orthodonticUpdate;

	const orthodonticDelete = useSelector((state) => state.orthodonticDelete);
	const { loading: loadingDelete, error: errorDelete } = orthodonticDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteOrthodonticAction(id));
		}
		history.push("/treatment-dashboard");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/doctor/treatment/orthodontic/get/${match.params.id}`);

			setNic(data.nic);
			setFirstVisit(data.firstVisit);
			setFullCost(data.fullCost);
			setPaid(data.paid);
			setFacialExamination(data.facialExamination);
			setFollowUpVisits(data.followUpVisits);
			setRemark(data.remark);
		};

		fetching();
	}, [match.params.id]);

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
			updateOrthodonticAction(
				match.params.id,
				nic,
				fullCost,
				paid,
				firstVisit,
				facialExamination,
				followUpVisits,
				remark
			)
		);
		if (!nic || !fullCost || !paid || !firstVisit || !facialExamination || !followUpVisits || !remark) return;

		history.push("/treatment-dashboard");
	};

	return (
		<Card>
			<Card.Header>Update Diagnosis Card For Orthodontic Treatment</Card.Header>
			<Card.Body>
				<Form onSubmit={updateHandler}>
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					<Form.Group controlId="nic">
						<Form.Label>NIC</Form.Label>
						<Form.Control type="nic" value={nic} placeholder="Enter the NIC" onChange={(e) => setNic(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="firstVisit">
						<Form.Label>First Visit Date</Form.Label>
						<Form.Control type="date" rows={4} onChange={(e) => setFirstVisit(e.target.value)} />
					</Form.Group>

					<Form.Group controlId="fullCost">
						<Form.Label>Full Cost</Form.Label>
						<Form.Control
							type="fullCost"
							value={fullCost}
							placeholder="Enter the Full Cost"
							onChange={(e) => setFullCost(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="paid">
						<Form.Label>Paid</Form.Label>
						<Form.Control value={paid} placeholder="Enter the Paid" onChange={(e) => setPaid(e.target.value)} />
					</Form.Group>
					<Form.Group controlId="facialExamination">
						<Form.Label>Facial Examination</Form.Label>
						<Form.Control
							as="textarea"
							type="facialExamination"
							value={facialExamination}
							placeholder="Enter the Facial Examination"
							onChange={(e) => setFacialExamination(e.target.value)}
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
