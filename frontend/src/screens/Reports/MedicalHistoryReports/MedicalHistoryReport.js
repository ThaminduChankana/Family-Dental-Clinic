import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/adminActions";
import axios from "axios";
import { Table } from "react-bootstrap";

export const MedicalHistoryReport = React.forwardRef((props, ref) => {
	const [highBloodPressure, setHighBloodPressure] = useState("");
	const [heartDisease, setHeartDisease] = useState("");
	const [diabetes, setDiabetes] = useState("");
	const [max, setMax] = useState("");

	useEffect(() => {
		const fetchingMedicalHistories = async () => {
			const { data } = await axios.get(`/user/admin/medical_history/report`, {
				headers: authHeader(),
			});

			setHighBloodPressure(data.high_blood_pressure);
			setHeartDisease(data.heart_disease);
			setDiabetes(data.diabetes);
			setMax(data.max);
		};

		fetchingMedicalHistories();
	}, []);

	return (
		<div ref={ref}>
			<h1 style={{ textAlign: "center" }}>Most common medical issue category of the year {new Date().getFullYear()}</h1>
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ fontSize: 22 }}>Medical issue Category</th>
						<th style={{ fontSize: 22 }}>Number Of medical issues</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ fontSize: 20 }}>High Blood Pressure</td>
						<td style={{ fontSize: 20 }}>{highBloodPressure}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Heart Disease</td>
						<td style={{ fontSize: 20 }}>{heartDisease}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Diabetes</td>
						<td style={{ fontSize: 20 }}> {diabetes}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>
							<b>Maximum issue</b>
						</td>
						<td style={{ fontSize: 20 }}>
							<b>{max}</b>
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
});
