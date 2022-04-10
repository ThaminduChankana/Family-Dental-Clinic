import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFillingAction, listFillings } from "../../actions/fillingAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function FillingView() {
	const dispatch = useDispatch();
	const fillingList = useSelector((state) => state.fillingList);
	const { loading, fillings, error } = fillingList;

	const fillingUpdate = useSelector((state) => state.fillingUpdate);
	const { success: successUpdate } = fillingUpdate;

	const fillingDelete = useSelector((state) => state.fillingDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = fillingDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteFillingAction(id));
		}
	};

	const userInfo = localStorage.getItem("userInfo");

	const history = useHistory();
	useEffect(() => {
		// if (!userInfo) {
		// history.pushState("/");
		dispatch(listFillings());
		// }
	}, [dispatch, history.push, userInfo, successUpdate, successDelete]);
	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{fillings?.map((filling) => (
				<Grid item xs={12} sm={6} md={3} key={fillings.indexOf(filling)}>
					<Card style={{ width: "30rem", height: "30rem" }} key="0">
						<Card.Header>
							<h2> NIC : {filling.nic}</h2>
						</Card.Header>
						<Card.Body>
							<h5>Cost : {filling.cost}</h5>
							<h5>Filling Material : {filling.fillingMaterial}</h5>
							<h5>Filling Type : {filling.fillingType}</h5>
							<h5>Anesthetic Status : {filling.anestheticStatus}</h5>
							<h5>Date : {filling.date}</h5>
							<h5>Checkup : {filling.checkup}</h5>
							<h5>Procedure : {filling.procedure}</h5>
							<h5>Remark : {filling.remark}</h5>

							<Button href={`/filling/${filling._id}`}>Edit</Button>
							<Button variant="danger" className="mx-2" onClick={() => deleteHandler(filling._id)}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				</Grid>
			))}
		</div>
	);
}
