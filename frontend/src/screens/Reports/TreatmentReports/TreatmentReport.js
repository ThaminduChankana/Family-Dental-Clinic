import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/doctorActions";
import axios from "axios";
import { Table } from "react-bootstrap";

export const TreatmentReport = React.forwardRef((props, ref) => {
	const [denture, setDenture] = useState("");
	const [paedodontics, setPaedodontics] = useState("");
	const [extraction, setExtraction] = useState("");
	const [oralHeigene, setOralHeigene] = useState("");
	const [fullMouthScaling, setFullMouthScaling] = useState("");
	const [fillings, setFillings] = useState("");
	const [orthodontics, setOrthodontics] = useState("");

	useEffect(() => {
		const fetchingBasicTreatments = async () => {
			const { data } = await axios.get(`/user/doctor/treatment/basic_treatment/get/report`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setDenture(data.dentures);
			setPaedodontics(data.paedodontics);
			setExtraction(data.extraction);
			setOralHeigene(data.oral_heigene);
			setFullMouthScaling(data.full_mouth_scaling);
		};
		const fetchingFillings = async () => {
			const { data } = await axios.get(`/user/doctor/treatment/filling/get/report`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setFillings(data.filling);
		};
		const fetchingOrthodontics = async () => {
			const { data } = await axios.get(`/user/doctor/treatment/orthodontic/get/report`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setOrthodontics(data.orthodontics);
		};

		fetchingBasicTreatments();
		fetchingFillings();
		fetchingOrthodontics();
	}, []);

	return (
		<div ref={ref}>
			<h1 style={{ textAlign: "center" }}>Treatment Report Of The Year {new Date().getFullYear()}</h1>
			<br />
			<Table striped bordered hover>
				<thead>
					<tr>
						<th style={{ fontSize: 22 }}>Treatment Category</th>
						<th style={{ fontSize: 22 }}>Number Of Treatments</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ fontSize: 20 }}>Dentures</td>
						<td style={{ fontSize: 20 }}>{denture}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Paedodontics</td>
						<td style={{ fontSize: 20 }}>{paedodontics}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Extraction</td>
						<td style={{ fontSize: 20 }}> {extraction}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Oral Heigene</td>
						<td style={{ fontSize: 20 }}>{oralHeigene}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Full Mouth Scaling</td>
						<td style={{ fontSize: 20 }}>{fullMouthScaling}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Fillings</td>
						<td style={{ fontSize: 20 }}> {fillings}</td>
					</tr>
					<tr>
						<td style={{ fontSize: 20 }}>Orthodontics</td>
						<td style={{ fontSize: 20 }}>{orthodontics}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
});
