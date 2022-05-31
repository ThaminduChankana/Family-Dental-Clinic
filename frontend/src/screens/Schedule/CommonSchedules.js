import { Accordion, Card, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listScheduleHandlingForUsers } from "../../actions/scheduleHandlingAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./scheduleHandling.css";

export default function CommonSchedules({ search }) {
	const dispatch = useDispatch();
	const scheduleListforUsers = useSelector((state) => state.ScheduleListforUsers);
	const { loading, schedules, error } = scheduleListforUsers;

	useEffect(() => {
		dispatch(listScheduleHandlingForUsers());
	}, [dispatch]);
	return (
		<div className="ScheduleBackgroundView">
			<MainScreen>
				<br></br>
				<br></br>
				<h1>Doctor's Schedule List</h1>

				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				<br></br>

				{schedules
					?.reverse()
					.filter(
						(filteredB) => filteredB.nic.includes(search) || filteredB.name.toLowerCase().includes(search.toLowerCase())
					)
					.map((schedule) => (
						<Accordion key={schedule._id}>
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
									<br></br>
									<br></br>
								</Card.Header>
								<Accordion.Collapse eventKey="0">
									<Card.Body>
										<Row>
											<Col md={6}>
												<h5>Name : {schedule.name}</h5>
												<h5>Date : {schedule.date}</h5>
												<h5>Time : {schedule.time}</h5>
												<h5>Description : {schedule.description}</h5>
												<br></br>
											</Col>
										</Row>
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
					))}
			</MainScreen>
			<br></br>
		</div>
	);
}
