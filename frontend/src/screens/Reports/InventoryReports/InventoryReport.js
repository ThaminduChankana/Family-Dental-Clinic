import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/adminActions";
import axios from "axios";
import { Table } from "react-bootstrap";

export const InventoryReport = React.forwardRef((props, ref) => {
	const [absorbentPoints, setAbsorbentPoints] = useState("");
	const [cottonPacks, setCottonPacks] = useState("");
	const [irrigatingDevices, setIrrigatingDevices] = useState("");
	const [bands, setBands] = useState("");
	const [brackets, setBrackets] = useState("");
	const [archwires, setArchwires] = useState("");
	const [twizzers, setTwizzers] = useState("");
	const [mouthMirror, setMouthMirror] = useState("");

	useEffect(() => {
		const fetchingInventoryCount = async () => {
			const { data } = await axios.get(`/user/admin/inventory/report`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setAbsorbentPoints(data.absorbent_points);
			setCottonPacks(data.cotton_packs);
			setIrrigatingDevices(data.irrigating_devices);
			setBands(data.bands);
			setBrackets(data.brackets);
			setArchwires(data.archwires);
			setTwizzers(data.twizzers);
			setMouthMirror(data.mouth_mirror);
		};

		fetchingInventoryCount();
	}, []);

	return (
		<div ref={ref}>
			<h1 style={{ textAlign: "center" }}>Annual Report on Inventory {new Date().getFullYear()}</h1>
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ fontSize: 22 }}>Product Name</th>
						<th style={{ fontSize: 22 }}>Inventory Count</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ fontSize: 20 }}>Absorbent Points</td>
						<td style={{ fontSize: 20 }}>{absorbentPoints}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Cotton Packs</td>
						<td style={{ fontSize: 20 }}>{cottonPacks}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Irrigating Devices</td>
						<td style={{ fontSize: 20 }}> {irrigatingDevices}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Bands</td>
						<td style={{ fontSize: 20 }}>{bands}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Brackets</td>
						<td style={{ fontSize: 20 }}>{brackets}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Archwires</td>
						<td style={{ fontSize: 20 }}> {archwires}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Twizzers</td>
						<td style={{ fontSize: 20 }}>{twizzers}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Mouth Mirror</td>
						<td style={{ fontSize: 20 }}>{mouthMirror}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
});
