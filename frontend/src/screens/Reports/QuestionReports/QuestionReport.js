import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/adminActions";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./questionReport.css";
import { useSelector } from "react-redux";
import MainScreen from "../../../components/MainScreen";

export const QuestionReport = React.forwardRef((props, ref) => {
	const [general, setGeneral] = useState("");
	const [appointment, setAppointment] = useState("");
	const [max, setMax] = useState("");

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	useEffect(() => {
		const fetchingQuestions = async () => {
			const { data } = await axios.get(`/user/admin/question/report`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setGeneral(data.general_dentistry_faq);
			setAppointment(data.appointments_faq);
			setMax(data.max);
		};

		fetchingQuestions();
	}, []);

	if (adminInfo) {
		return (
			<div ref={ref}>
				<h1 style={{ textAlign: "center" }}>Question Report Of The Year {new Date().getFullYear()}</h1>
				<br />
				<Table striped bordered hover>
					<thead>
						<tr>
							<th style={{ fontSize: 22 }}>Question Type</th>
							<th style={{ fontSize: 22 }}>Number Of Statics</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={{ fontSize: 20 }}>General Dentistry FAQs</td>
							<td style={{ fontSize: 20 }}>{general}</td>
						</tr>
						<tr>
							<td style={{ fontSize: 20 }}>Appointment FAQs</td>
							<td style={{ fontSize: 20 }}>{appointment}</td>
						</tr>
					</tbody>
				</Table>
				<h1>Frequently Asked Question Type is {max}</h1>
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
});
