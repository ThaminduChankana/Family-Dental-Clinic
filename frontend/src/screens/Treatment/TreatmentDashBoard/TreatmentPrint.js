import React, { useRef } from "react";
import TreatmentNavBar from "../TreatmentDashBoard/TreatmentNavBar";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import { TreatmentReport } from "./TreatmentReport";
const TreatmentPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div style={{ minHeight: 700 }}>
			<TreatmentNavBar />
			<Card
				style={{
					margin: 50,
					left: "30%",
					width: "50%",
					padding: 40,
					borderRadius: 20,
					borderColor: "#808080",
					borderWidth: 0.5,
				}}
			>
				<TreatmentReport ref={componentRef} />
				<Button
					style={{ marginLeft: 780, left: "70%", positon: "center", width: "15%" }}
					onClick={handlePrint}
					variant="primary"
				>
					Generate PDF
				</Button>
			</Card>
			<br />
		</div>
	);
};

export default TreatmentPrint;
