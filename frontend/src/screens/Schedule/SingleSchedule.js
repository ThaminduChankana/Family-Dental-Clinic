import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteScheduleHandlingAction, updateScheduleHandlingAction } from "../../actions/scheduleHandlingAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { authHeader } from "../../actions/adminActions";
import "./scheduleHandling.css";
import MainScreen from "../../components/MainScreen";

export default function SingleSchedule({ match, history }) {
	const [nic, setNic] = useState("");
	const [name, setName] = useState("");
	const [time, setTime] = useState("");
	const [date, setDate] = useState("");
	const [description, setDescription] = useState("");
	const [addedBy, setAddedBy] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;
	const ScheduleHandlingUpdate = useSelector((state) => state.ScheduleHandlingUpdate);
	const { loading, error } = ScheduleHandlingUpdate;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteScheduleHandlingAction(id));
		}
		history.push("/schedule-Handling-View");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/admin/schedule/get/${match.params.id}`, {
				headers: authHeader(),
			});

			setNic(data.nic);
			setName(data.name);
			setTime(data.time);
			setDate(data.date);
			setDescription(data.description);
			setAddedBy(data.addedBy);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateScheduleHandlingAction(match.params.id, nic, name, date, time, description, addedBy));
		if (!nic || !name || !date || !time || !description || !addedBy) return;

		history.push("/schedule-Handling-View");
	};
	if (adminInfo) {
		return (
			<div className="ScheduleBackgroundUpdate">
				{" "}
				<MainScreen title={"UPDATE DOCTOR'S SCHEDULE"}>
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
							marginRight: "10%",
							width: "80%",
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.9)",
						}}
					>
						<br></br>
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
								<h3>Update Doctor's Schedule</h3>
							</div>
						</Card.Header>
						<Card.Body>
							<Form onSubmit={updateHandler}>
								{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

								<Form.Group controlId="nic">
									<Form.Label>NIC</Form.Label>
									<Form.Control
										type="nic"
										value={nic}
										placeholder="Enter the NIC"
										onChange={(e) => setNic(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="name">
									<Form.Label>Name</Form.Label>
									<Form.Control
										value={name}
										placeholder="Enter the name"
										rows={4}
										onChange={(e) => setName(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="date">
									<Form.Label>Date</Form.Label>
									<Form.Control
										type="date"
										value={date}
										placeholder="Enter the date"
										onChange={(e) => setDate(e.target.value)}
									/>
								</Form.Group>
								<Form.Group controlId="time">
									<Form.Label>Time</Form.Label>
									<Form.Control
										type=" "
										placeholder="Enter the date"
										value={time}
										onChange={(e) => setTime(e.target.value)}
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
									/>
								</Form.Group>
								<Form.Group controlId="addedBy">
									<Form.Label>AddedBy</Form.Label>
									<Form.Control
										type="addedBy"
										value={addedBy}
										placeholder="Enter the added By"
										onChange={(e) => setAddedBy(e.target.value)}
									/>
								</Form.Group>
								<br></br>
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
