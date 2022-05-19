import { useHistory, Link } from "react-router-dom";
import { Card, Button, Accordion, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasicTreatmentAction, listBasicTreatments } from "../../../actions/basicTreatmentAction";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";
import swal from "sweetalert";

function BasicTreatmentView({ search }) {
	const dispatch = useDispatch();
	const doctor_Login = useSelector((state) => state.doctor_Login);
	const { doctorInfo } = doctor_Login;
	const basicTreatmentList = useSelector((state) => state.basicTreatmentList);
	const { loading, basicTreatments, error } = basicTreatmentList;

	const basicTreatmentUpdate = useSelector((state) => state.basicTreatmentUpdate);
	const { success: successUpdate } = basicTreatmentUpdate;

	const basicTreatmentDelete = useSelector((state) => state.basicTreatmentDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = basicTreatmentDelete;

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
					dispatch(deleteBasicTreatmentAction(id));
					swal({
						title: "Success!",
						text: "Deleted Basic Treatment Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Basic Treatment",
					type: "error",
				});
			});
	};
	console.log(basicTreatments);

	const history = useHistory();
	useEffect(() => {
		if (!doctorInfo) history.pushState("/");
		dispatch(listBasicTreatments());
	}, [dispatch, history.push, doctorInfo, successUpdate, successDelete]);
	return (
		<div style={{ minHeight: 700 }}>
			<br />
			<br />
			<TreatmentNavBar />
			<br />
			<Link to="/treatment-basicTreatment-create">
				<Button style={{ marginLeft: 1500, marginBottom: 6 }} size="lg">
					New Basic Treatment
				</Button>
			</Link>
			<h1 style={{ textAlign: "center" }}>Basic Treatment List</h1>
			{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
			{loadingDelete && <Loading />}
			{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
			{loading && <Loading />}
			{basicTreatments
				?.reverse()
				.filter((filteredB) => filteredB.nic.includes(search))
				.map((basic) => (
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
							key={basic._id}
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
										{basic.nic}
									</Accordion.Toggle>
								</span>
								<div>
									<Button style={{ width: "70px" }} href={`/basicTreatment/${basic._id}`}>
										Edit
									</Button>
								</div>
								&emsp;
								<div>
									<Button
										style={{ width: "70px" }}
										variant="danger"
										className="mx-2"
										onClick={() => deleteHandler(basic._id)}
									>
										Delete
									</Button>
								</div>
							</Card.Header>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<Row>
										<Col md={20}>
											<h5>Basic Treatment Type : {basic.treatmentType}</h5>
											<h5>Cost : {basic.cost}</h5>
											<h5>Date : {basic.date}</h5>
											<h5>CheckUp : {basic.checkup}</h5>
											<h5>Procedure : {basic.procedure}</h5>
											<h5>Remark : {basic.remark}</h5>
										</Col>
									</Row>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				))}
		</div>
	);
}
export default BasicTreatmentView;
