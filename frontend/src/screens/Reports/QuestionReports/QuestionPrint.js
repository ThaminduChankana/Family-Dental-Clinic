import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import { QuestionReport } from "./QuestionReport";
const QuestionPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div style={{ minHeight: 700 }} className="questionreport">
			<br />
			<br />

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
				<QuestionReport ref={componentRef} />
				<Button
					style={{ marginLeft: 600, left: "50%", positon: "center", width: "20%" }}
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

export default QuestionPrint;
