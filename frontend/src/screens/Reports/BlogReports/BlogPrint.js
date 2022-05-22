import React, { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import MainScreen from "../../../components/MainScreen";
import { BlogReport } from "./BlogReport";
import "./blogReport.css";
const BlogPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	if (adminInfo) {
		return (
			<div className="blogReportBg">
				<MainScreen>
					<div style={{ minHeight: 700 }}>
						<br></br>
						<Button
							style={{
								marginLeft: 80,
								marginBottem: 6,
								fontSize: 15,
							}}
							href="/admin"
						>
							{" "}
							Back to Admin Operation page
						</Button>
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
							<BlogReport ref={componentRef} />
							<br></br>
							<Button
								style={{ marginLeft: "80%", width: "20%", height: "20%" }}
								onClick={handlePrint}
								variant="primary"
							>
								Generate PDF
							</Button>
						</Card>
						<br />
					</div>
				</MainScreen>
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

export default BlogPrint;
