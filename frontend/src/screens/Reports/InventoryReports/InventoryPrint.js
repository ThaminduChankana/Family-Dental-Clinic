import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";
import { InventoryReport } from "./InventoryReport";
import MainScreen from "../../../components/MainScreen";

const InventoryPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<MainScreen>
				<div style={{ minHeight: 700 }}>
					<br />
					<br />
					<Button
						style={{
							float: "left",
							marginTop: 5,
							fontSize: 15,
						}}
						href="/inventory-view"
					>
						{" "}
						Back to Inventory Page
					</Button>
					<br></br>
					<br></br>
					<Card
						style={{
							margin: 50,
							marginLeft: "10%",
							marginRight: "10%",
							width: "80%",
							padding: 40,
							borderRadius: 20,
							borderColor: "#808080",
							borderWidth: 0.5,
							background: "rgba(255, 255, 255, 0.9)",
						}}
					>
						<InventoryReport ref={componentRef} />
						<br></br>
						<Button
							style={{ marginLeft: "80%", width: "20%", height: "20%", fontSize: 15 }}
							onClick={handlePrint}
							variant="primary"
						>
							Generate PDF
						</Button>
					</Card>
				</div>
			</MainScreen>
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
export default InventoryPrint;
