import { useHistory } from "react-router-dom";
import { Accordion, Card, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
//import { Link,useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteScheduleHandlingAction, listScheduleHandling } from "../../actions/scheduleHandlingAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./scheduleHandling.css";

export default function ScheduleHandlingView({ search }) {
	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;
	const ScheduleHandlingList = useSelector((state) => state.ScheduleHandlingList);
	const { loading, schedules, error } = ScheduleHandlingList;

	const ScheduleHandlingUpdate = useSelector((state) => state.ScheduleHandlingUpdate);
	const { success: successUpdate } = ScheduleHandlingUpdate;

	const ScheduleHandlingDelete = useSelector((state) => state.ScheduleHandlingDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = ScheduleHandlingDelete;
	console.log(schedules);
	const deleteHandler = (id) => {
		if (window.confirm("Are you sure")) {
			dispatch(deleteScheduleHandlingAction(id));
		}
	};

	const history = useHistory();
	useEffect(() => {
		if (!adminInfo) history.pushState("/");
		dispatch(listScheduleHandling());
	}, [dispatch, history.push, adminInfo, successUpdate, successDelete, history]);
	return (
		<div className="ScheduleBackgroundView">
			<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
				<h1>Doctor's Schedule List</h1>

				<br></br>
				<ButtonGroup className="mb-2" size="lg" style={{ width: "100%" }}>
					<Button href="/admin">Back to operations page</Button>

					<Button href="/schedule-Handling-Create">+ Doctor's Schedule Create</Button>

					<Button href="/schedule-Report">Doctor's Schedule Report Generate</Button>
				</ButtonGroup>
				<br></br>
				{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
				{loadingDelete && <Loading />}
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<br></br>

				{schedules
					?.reverse()
					.filter(
						(filteredB) => filteredB.nic.includes(search) || filteredB.name.toLowerCase().includes(search.toLowerCase())
					)
					.map((schedule) => (
						<Accordion>
							<Card
								style={{
									margin: 10,
									borderRadius: 25,
									borderWidth: 1.0,
									borderColor: "rgb(0,0,0,0.5)",
									marginTop: 20,
									paddingInline: 10,
									background: "rgb(235, 235, 235)",
								}}
								key={schedule._id}
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
										// onClick={() => ModelShow(note)}
										style={{
											color: "black",
											textDecoration: "none",
											flex: 1,
											cursor: "pointer",
											alignSelf: "center",
											fontSize: 18,
										}}
									>
										<Accordion.Toggle
											as={Card.Text}
											variant="link"
											eventKey="0"
											style={{ paddingInline: 20, marginTop: 10, marginBottom: 10 }}
										>
											Name : {schedule.name}
											<br></br>
											Date :{schedule.date}
										</Accordion.Toggle>
									</span>
									<div>
										<Button style={{ marginTop: 20, fontSize: 15 }} href={`/scheduleHandling/${schedule._id}`}>
											Edit
										</Button>
									</div>
									&emsp;
									<div>
										<Button
											style={{ marginTop: 20, fontSize: 15 }}
											variant="danger"
											className="mx-2"
											onClick={() => deleteHandler(schedule._id)}
										>
											Delete
										</Button>
									</div>
									<br></br>
									<br></br>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Row>
											<Col md={6}>
												<h2> NIC : {schedule.nic}</h2>
												<h5>Name : {schedule.name}</h5>
												<h5>Date : {schedule.date}</h5>
												<h5>Time : {schedule.time}</h5>
												<h5>Description : {schedule.description}</h5>
												<h5>Added By : {schedule.addedBy}</h5>
												<br></br>
											</Col>
										</Row>
										{/* <blockquote className="blockquote mb-0">
										<Card.Footer className="text-muted">
											Created on -<cite title="Source Title"> {schedule.createdAt.substring(0, 10)}</cite>
										</Card.Footer>
									</blockquote> */}
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					))}
			</MainScreen>
		</div>
	);
}
