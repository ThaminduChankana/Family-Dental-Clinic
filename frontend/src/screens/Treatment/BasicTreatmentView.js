import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasicTreatmentAction, listBasicTreatments } from "../../actions/basicTreatmentAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function BasicTreatmentView() {
	const dispatch = useDispatch();
	const basicTreatmentList = useSelector((state) => state.basicTreatmentList);
	const { loading, basicTreatments, error } = basicTreatmentList;

	const basicTreatmentUpdate = useSelector((state) => state.basicTreatmentUpdate);
	const { success: successUpdate } = basicTreatmentUpdate;

	const basicTreatmentDelete = useSelector((state) => state.basicTreatmentDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = basicTreatmentDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteBasicTreatmentAction(id));
		}
	};

	const userInfo = localStorage.getItem("userInfo");

	const history = useHistory();
	useEffect(() => {
		// if (!userInfo) {
		// history.pushState("/");
		dispatch(listBasicTreatments());
		// }
	}, [dispatch, history.push, userInfo, successUpdate, successDelete]);
	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{basicTreatments?.map((basic) => (
				<Grid item xs={12} sm={6} md={3} key={basicTreatments.indexOf(basic)}>
					<Card style={{ width: "30rem", height: "25rem" }} key="0">
						<Card.Header>
							<h2> NIC : {basic.nic}</h2>
						</Card.Header>
						<Card.Body>
							<h5>Basic Treatment Type : {basic.treatmentType}</h5>
							<h5>Cost : {basic.cost}</h5>
							<h5>Date : {basic.date}</h5>
							<h5>CheckUp : {basic.checkup}</h5>
							<h5>Procedure : {basic.procedure}</h5>
							<h5>Remark : {basic.remark}</h5>
							<Button href={`/basicTreatment/${basic._id}`}>Edit</Button>
							<Button variant="danger" className="mx-2" onClick={() => deleteHandler(basic._id)}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				</Grid>
			))}
		</div>
	);
}
