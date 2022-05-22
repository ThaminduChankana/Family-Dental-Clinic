import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { MedicalHistoryReport } from "./MedicalHistoryReport";
import MainScreen from "../../../components/MainScreen";

const MedicalHistoryPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const admin_Login = useSelector((state) => state.admin_Login);

	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<div className="medicalHistory-report-bg">
				<div style={{ minHeight: 700 }}>
					<br />
					<br></br>
					<Button
						style={{
							marginLeft: 80,
							marginBottem: 6,
							fontSize: 15,
						}}
						href="/admin-medical-history"
					>
						{" "}
						Back to Patients' medical History
					</Button>
					<br></br>

					<Card
						style={{
							margin: 50,
							marginLeft: "25%",
							width: "50%",
							padding: 40,
							borderRadius: 20,
							borderWidth: 0.5,
							background: "rgba(255, 255, 255, 0.9)",
						}}
					>
						<MedicalHistoryReport ref={componentRef} />
						<br></br>
						<Button style={{ marginLeft: "80%", width: "20%", height: "20%" }} onClick={handlePrint} variant="primary">
							Generate PDF
						</Button>
					</Card>
					<br />
				</div>
			</div>
		);
	} else {
		return (
			<div className="denied">
				<MainScreen />
				<br></br>
			</div>
		);
	}
};

export default MedicalHistoryPrint;
