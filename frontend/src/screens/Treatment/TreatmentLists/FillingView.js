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
			<div style={{ minHeight: 700, backgroundColor: "#a4dded" }}>
				<MainScreen title={`Welcome Back ${doctorInfo && doctorInfo.name}..`}>
					<br />
					<TreatmentNavBar />
					<br></br>
					<br></br>
					<br></br>
					<Row>
						<Col>
							<h1 style={{ marginLeft: 10 }}>Filling Treatment List</h1>
						</Col>
						<Col>
							<Link to="/treatment-filling-create">
								<Button style={{ float: "right", marginRight: 10 }} size="lg">
									+ Create New Filling
								</Button>
							</Link>
						</Col>
					</Row>
					<br />
					{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
					{loadingDelete && <Loading />}
					{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
					{loading && <Loading />}
					{fillings
						?.reverse()
						.filter((filtered) => filtered.nic.includes(search))
						.map((filling) => (
							<Accordion key={filling._id}>
								<Card
									style={{
										borderRadius: 25,
										borderWidth: 1.0,
										borderColor: "rgb(0,0,0,0.5)",
										marginTop: 20,
										paddingInline: 10,
										background: "rgb(235, 235, 235)",
									}}
									key={filling._id}
								>
									<Card.Header
										style={{
											display: "flex",
											paddingInline: 10,
											borderRadius: 25,
											marginTop: 10,
											marginBottom: 10,
											borderColor: "black",
											background: "rgba(255, 255, 255)",
										}}
									>
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
												&emsp; &emsp;&emsp; &emsp;&emsp; &emsp;&emsp; &emsp; Date : {filling.date}
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
					<br></br>
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
