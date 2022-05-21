import React, { useEffect, useState } from "react";
import { authHeader } from "../../../actions/adminActions";
import axios from "axios";
import { Chart as Chartjs, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

Chartjs.register(CategoryScale, LinearScale, BarElement);

export const PatientRegistrationChart = React.forwardRef((props, ref) => {
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

	var data = {
		labels: [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		],
		datasets: [
			{
				label: "# of Votes",
				data: [january, february, march, april, may, june, july, august, september, october, november, december],
				backgroundColor: [
					"rgba(255, 99, 132, 0.5)",
					"rgba(54, 162, 235, 0.5)",
					"rgba(255, 206, 86, 0.5)",
					"rgba(75, 192, 192, 0.5)",
					"rgba(153, 102, 255, 0.5)",
					"rgba(255, 159, 64, 0.5)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	var options = {
		maintainAspectRatio: false,
		scales: {
			y: {
				ticks: {
					precision: 0,
				},
				beginAtZero: true,
			},
		},
		legend: {
			labels: { fontSize: 25 },
		},
	};

	return (
		<div
			className="patientBar"
			style={{ marginTop: "2%", marginBottom: "2%", marginLeft: 15, marginRight: 15, backgroundPosition: "center" }}
		>
			<Bar data={data} options={options} height={200} />
		</div>
	);
});
