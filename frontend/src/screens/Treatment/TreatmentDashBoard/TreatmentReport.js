import React, { useEffect, useState, useRef } from "react";
import { authHeader } from "../../../actions/doctorActions";
import axios from "axios";

export const TreatmentReport = React.forwardRef((props, ref) => {
	const [denture, setDenture] = useState();
	const [paedodontics, setPaedodontics] = useState();
	const [extraction, setExtraction] = useState();
	const [oralHeigene, setOralHeigene] = useState("");
	const [fullMouthScaling, setFullMouthScaling] = useState();
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
			{<h1>Denture : {denture}</h1>}
			{<h1>Paedodontics : {paedodontics}</h1>}
			{<h1>Extraction : {extraction}</h1>}
			{<h1>Oral Heigene : {oralHeigene}</h1>}
			{<h1>Full Mouth Scaling : {fullMouthScaling}</h1>}
			{<h1>Fillings : {fillings}</h1>}
			{<h1>Orthodontics : {orthodontics}</h1>}
		</div>
	);
});
