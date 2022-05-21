import React, {useRef} from "react";
import {Card, Button} from "react-bootstrap";
import {useReactToPrint} from "react-to-print";
import { useSelector } from "react-redux";
import {InventoryReport} from "./InventoryReport";

const InventoryPrint = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	return (
		<div style={{ minHeight: 700 }}>
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
				<InventoryReport ref={componentRef} />
				<Button
					style={{ marginLeft: 780, left: "70%", positon: "center", width: "15%" }}
					onClick={handlePrint}
					variant="primary"
				>
					Generate PDF
				</Button>
			</Card>
			
		</div>
	);
};

export default InventoryPrint;