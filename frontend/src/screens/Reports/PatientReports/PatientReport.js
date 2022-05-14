import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/adminActions";
import axios from "axios";
import { Table } from "react-bootstrap";

export const PatientReport = React.forwardRef((props, ref) => {
	const [january, setJanuary] = useState("");
	const [february, setFebruary] = useState("");
	const [march, setMarch] = useState("");
	const [april, setApril] = useState("");
	const [may, setMay] = useState("");
	const [june, setJune] = useState("");
	const [july, setJuly] = useState("");
	const [august, setAugust] = useState("");
	const [september, setSeptember] = useState("");
	const [october, setOctober] = useState("");
	const [november, setNovember] = useState("");
	const [december, setDecember] = useState("");

	useEffect(() => {
		const fetchingPatientCount = async () => {
			const { data } = await axios.get(`/user/admin/patients/count`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setJanuary(data.january);
			setFebruary(data.february);
			setMarch(data.march);
			setApril(data.april);
			setMay(data.may);
			setJune(data.june);
			setJuly(data.july);
			setAugust(data.august);
			setSeptember(data.september);
			setOctober(data.october);
			setNovember(data.november);
			setDecember(data.december);
		};

		fetchingPatientCount();
	}, []);

	return (
		<div style={{}}>
			<div ref={ref} style={{}}>
				<h1 style={{ textAlign: "center" }}>Patient Report Of The Year {new Date().getFullYear()}</h1>
				<br />
				<Table striped bordered hover style={{ borderColor: "#808080" }}>
					<thead>
						<tr>
							<th>Month</th>
							<th>Patient Count</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>January</td>
							<td>{january}</td>
						</tr>
						<tr>
							<td>February</td>
							<td>{february}</td>
						</tr>
						<tr>
							<td>March</td>
							<td> {march}</td>
						</tr>
						<tr>
							<td>April</td>
							<td>{april}</td>
						</tr>
						<tr>
							<td>May</td>
							<td>{may}</td>
						</tr>
						<tr>
							<td>June</td>
							<td> {june}</td>
						</tr>
						<tr>
							<td>July</td>
							<td>{july}</td>
						</tr>
						<tr>
							<td>August</td>
							<td>{august}</td>
						</tr>
						<tr>
							<td>September</td>
							<td>{september}</td>
						</tr>
						<tr>
							<td>October</td>
							<td> {october}</td>
						</tr>
						<tr>
							<td>November</td>
							<td>{november}</td>
						</tr>
						<tr>
							<td>December</td>
							<td>{december}</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
});
