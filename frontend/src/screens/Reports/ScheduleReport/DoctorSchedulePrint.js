import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { DoctorScheduleReport } from "./DoctorScheduleReport";
import "./DoctorScheduleReport.css";

const DoctorSchedulePrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div className="scheduleReportBg">
			<div>
				<br></br>
				<br></br>
				<Button
					style={{
						fontSize: 15,
						marginLeft: 300,
					}}
					href="/schedule-Handling-View"
				>
					{" "}
					Back to Schedule List
				</Button>
			</div>
			<Card
				style={{
					margin: 50,
					marginLeft: "25%",
					width: "50%",
					padding: 40,
					borderRadius: 20,
					borderColor: "#808080",
					borderWidth: 0.5,
					background: "rgba(255, 255, 255, 0.9)",
				}}
			>
				<DoctorScheduleReport ref={componentRef} />
				<br></br>
				<Button style={{ marginLeft: 500, left: "70%", width: "25%" }} onClick={handlePrint} variant="primary">
					Generate PDF
				</Button>
			</Card>
			<br />
		</div>
	);
};

export default DoctorSchedulePrint;
