import React, { useEffect, useState, useRef } from "react";
import { authHeader } from "../../../actions/doctorActions";
import axios from "axios";
import { Button, Form, Table } from "react-bootstrap";

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
			const { data } = await axios.get(`http://localhost:5000/user/doctor/treatment/basic_treatment/get/report`, {
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
			const { data } = await axios.get(`http://localhost:5000/user/doctor/treatment/filling/get/report`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});
			setFillings(data.filling);
		};
		const fetchingOrthodontics = async () => {
			const { data } = await axios.get(`http://localhost:5000/user/doctor/treatment/orthodontic/get/report`, {
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
						<th>Treatment Category</th>
						<th>Number Of Treatments</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Dentures</td>
						<td>{denture}</td>
					</tr>
					<tr>
						<td>Paedodontics</td>
						<td>{paedodontics}</td>
					</tr>
					<tr>
						<td>Extraction</td>
						<td> {extraction}</td>
					</tr>
					<tr>
						<td>Oral Heigene</td>
						<td>{oralHeigene}</td>
					</tr>
					<tr>
						<td>Full Mouth Scaling</td>
						<td>{fullMouthScaling}</td>
					</tr>
					<tr>
						<td>Fillings</td>
						<td> {fillings}</td>
					</tr>
					<tr>
						<td>Orthodontics</td>
						<td>{orthodontics}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
});
