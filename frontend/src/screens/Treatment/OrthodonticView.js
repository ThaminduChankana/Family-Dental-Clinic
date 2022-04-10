import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrthodonticAction, listOrthodontics } from "../../actions/orthodonticAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function OrthodonticView() {
	const dispatch = useDispatch();
	const orthodonticList = useSelector((state) => state.orthodonticList);
	const { loading, orthodontics, error } = orthodonticList;

	const orthodonticUpdate = useSelector((state) => state.orthodonticUpdate);
	const { success: successUpdate } = orthodonticUpdate;

	const orthodonticDelete = useSelector((state) => state.orthodonticDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = orthodonticDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteOrthodonticAction(id));
		}
	};

	const userInfo = localStorage.getItem("userInfo");

	const history = useHistory();
	useEffect(() => {
		// if (!userInfo) {
		// history.pushState("/");
		dispatch(listOrthodontics());
		// }
	}, [dispatch, history.push, userInfo, successUpdate, successDelete]);
	return (
		<div>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{orthodontics?.map((orthodontic) => (
				<Grid item xs={12} sm={6} md={3} key={orthodontics.indexOf(orthodontic)}>
					<Card style={{ width: "30rem", height: "30rem" }} key="0">
						<Card.Header>
							<h2> NIC : {orthodontic.nic}</h2>
						</Card.Header>
						<Card.Body>
							<h5>First Visit Date : {orthodontic.firstVisit}</h5>
							<h5>Full Cost : {orthodontic.fullCost}</h5>
							<h5>Paid : {orthodontic.paid}</h5>
							<h5>Facial Examination : {orthodontic.facialExamination}</h5>
							<h5>Follow Up Visits : {orthodontic.followUpVisits}</h5>
							<h5>Remark : {orthodontic.remark}</h5>
							<Button href={`/orthodontic/${orthodontic._id}`}>Edit</Button>
							<Button variant="danger" className="mx-2" onClick={() => deleteHandler(orthodontic._id)}>
								Delete
							</Button>
						</Card.Body>
					</Card>
				</Grid>
			))}
		</div>
	);
}
