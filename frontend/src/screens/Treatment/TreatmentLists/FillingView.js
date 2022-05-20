import { useHistory, Link } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFillingAction, listFillings } from "../../../actions/fillingAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";
import MainScreen from "../../../components/MainScreen";
import swal from "sweetalert";

export default function FillingView({ search }) {
	const dispatch = useDispatch();

	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;
	const fillingList = useSelector((state) => state.fillingList);
	const { loading, fillings, error } = fillingList;

	const fillingUpdate = useSelector((state) => state.fillingUpdate);
	const { success: successUpdate } = fillingUpdate;

	const fillingDelete = useSelector((state) => state.fillingDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = fillingDelete;

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
					dispatch(deleteFillingAction(id));
					swal({
						title: "Success!",
						text: "Deleted Filling Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/treatment-filling-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Filling",
					type: "error",
				});
			});
	};

	const history = useHistory();
	useEffect(() => {
		dispatch(listFillings());
	}, [dispatch, history, doctorInfo, successUpdate, successDelete]);
	if (doctorInfo) {
		return (
			<div style={{ minHeight: 700 }}>
				<br />
				<br />
				<TreatmentNavBar />
				<br />
				<Link to="/treatment-filling-create">
					<Button style={{ marginLeft: 1500, marginBottom: 6 }} size="lg">
						New Filling
					</Button>
				</Link>
				<h1 style={{ textAlign: "center" }}>Filling Treatment List</h1>
				{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
				{loadingDelete && <Loading />}
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				{fillings
					?.reverse()
					.filter((filtered) => filtered.nic.includes(search))
					.map((filling) => (
						<Accordion>
							<Card
								style={{
									margin: 10,
									left: "30%",
									width: "40%",
									borderRadius: 25,
									borderWidth: 1.0,
									borderColor: "rgb(0,0,0,0.5)",
								}}
								key={filling._id}
							>
								<Card.Header style={{ display: "flex" }}>
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
										<Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
											NIC : &emsp;
											{filling.nic}
										</Accordion.Toggle>
									</span>
									<div>
										<Button style={{ width: "70px" }} href={`/filling/${filling._id}`}>
											Edit
										</Button>
									</div>
									&emsp;
									<div>
										<Button
											style={{ width: "70px" }}
											variant="danger"
											className="mx-2"
											onClick={() => deleteHandler(filling._id)}
										>
											Delete
										</Button>
									</div>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Row>
											<Col md={20}>
												<h5>Cost : {filling.cost}</h5>
												<h5>Filling Material : {filling.fillingMaterial}</h5>
												<h5>Filling Type : {filling.fillingType}</h5>
												<h5>Anesthetic Status : {filling.anestheticStatus}</h5>
												<h5>Date : {filling.date}</h5>
												<h5>Checkup : {filling.checkup}</h5>
												<h5>Procedure : {filling.procedure}</h5>
												<h5>Remark : {filling.remark}</h5>

												<br></br>
											</Col>
										</Row>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					))}
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
