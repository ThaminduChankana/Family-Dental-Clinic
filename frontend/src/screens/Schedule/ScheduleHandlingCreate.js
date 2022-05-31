import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createScheduleHandlingAction } from "../../actions/scheduleHandlingAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./scheduleHandling.css";

export default function ScheduleHandlingCreate({ history }) {
	const [nic, setNic] = useState("");
	const [name, setName] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [addedBy, setAddedBy] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const ScheduleHandlingCreate = useSelector((state) => state.ScheduleHandlingCreate);
	const { loading, error } = ScheduleHandlingCreate;

	const resetHandler = () => {
		setNic("");
		setName("");
		setTime("");
		setDate("");
		setDescription("");
		setAddedBy("");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!nic || !name || !date || !time || !description || !addedBy) return;
		dispatch(createScheduleHandlingAction(nic, name, date, time, description, addedBy));

		resetHandler();
		history.push("/schedule-Handling-View");
	};
	const demoHandler = async (e) => {
		e.preventDefault();
		setNic("770954352V");
		setName("Dr Jagath Gamage");
		setTime("11.30-14.30");
		setDate("2022-06-05");
		setDescription("Orthodontic Channelling");
		setAddedBy("admin 1");
	};
	useEffect(() => {}, []);
	if (adminInfo) {
		return (
			<div className="ScheduleBackgroundCreate">
				{" "}
				<MainScreen title={"CREATE DOCTOR'S SCHEDULE"}>
					<Button
						style={{
							float: "left",
							fontSize: 15,
							marginLeft: 10,
						}}
						href="/schedule-Handling-View"
					>
						{" "}
						Back to Schedule List
					</Button>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "0%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<Card.Header
							style={{
								borderRadius: 45,
								borderWidth: 2.0,
								marginTop: 20,
								paddingInline: 10,
								background: "white",
							}}
						>
							<div className="Sheader">
								{" "}
								<h3>Create a New Doctor's schedule</h3>
							</div>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={submitHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
								<Form.Group controlId="nic">
									<Form.Label>NIC</Form.Label>
									<Form.Control
										type="nic"
										value={nic}
										placeholder="Enter the NIC"
										onChange={(e) => setNic(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										value={name}
										placeholder="Enter the name"
										rows={4}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="date">
									<Form.Label>Date</Form.Label>
									<Form.Control
										type="date"
										value={date}
										placeholder="Enter the date"
										onChange={(e) => setDate(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="time">
									<Form.Label>Time</Form.Label>
									<Form.Control
										type=""
										value={time}
										placeholder="00:00 - 00:00"
										onChange={(e) => setTime(e.target.value)}
										required
									/>
								</Form.Group>

								<Form.Group controlId="Description">
									<Form.Label>Description</Form.Label>
									<Form.Control
										as="textarea"
										type="Description"
										value={description}
										placeholder="Enter the Description"
										onChange={(e) => setDescription(e.target.value)}
										required
									/>
								</Form.Group>
								<Form.Group controlId="addedBy">
									<Form.Label>Added By</Form.Label>
									<Form.Control
										type="addedBy"
										value={addedBy}
										placeholder="Enter the added by"
										onChange={(e) => setAddedBy(e.target.value)}
										required
									/>
								</Form.Group>
								<br></br>

								{loading && <Loading size={50} />}

								<Button type="submit" variant="primary">
									Submit
								</Button>

								<Button className="mx-2" onClick={resetHandler} variant="danger">
									Reset
								</Button>
								<Button variant="info" onClick={demoHandler}>
									Demo
								</Button>
							</Form>
							<br></br>
						</Card.Body>
					</Card>
					<br></br>
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
