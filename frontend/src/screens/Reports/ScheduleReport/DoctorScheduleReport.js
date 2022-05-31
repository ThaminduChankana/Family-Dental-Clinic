import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/adminActions";
import axios from "axios";
import { Table } from "react-bootstrap";

export const DoctorScheduleReport = React.forwardRef((props, ref) => {
	const [drSanjeewa, setDrSanjeewa] = useState("");
	const [drSusith, setDrSusith] = useState("");
	const [drSunil, setDrSunil] = useState("");
	const [drNamal, setDrNamal] = useState("");
	const [drJagath, setDrJagath] = useState("");

	useEffect(() => {
		const fetchingScheduleHandling = async () => {
			const { data } = await axios.get(`/user/admin/schedule/count`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setDrSanjeewa(data.dr_sanjeewa);
			setDrSusith(data.dr_susith);
			setDrSunil(data.dr_sunil);
			setDrNamal(data.dr_namal);
			setDrJagath(data.dr_jagath);
		};
		fetchingScheduleHandling();
	}, []);

	return (
		<div ref={ref}>
			<h1 style={{ textAlign: "center" }}>Schedule Report Of The Year {new Date().getFullYear()}</h1>
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ fontSize: 22 }}>Dr Name</th>
						<th style={{ fontSize: 22 }}>Number Of Schedules</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ fontSize: 20 }}>Dr Sanjeewa Dissanayake</td>
						<td style={{ fontSize: 20 }}>{drSanjeewa}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Dr Susith Bandara</td>
						<td style={{ fontSize: 20 }}>{drSusith}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Dr Sunil Nanyakkara</td>
						<td style={{ fontSize: 20 }}> {drSunil}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Dr Namal Perera</td>
						<td style={{ fontSize: 20 }}>{drNamal}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Dr Jagath Gamage</td>
						<td style={{ fontSize: 20 }}>{drJagath}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
});
