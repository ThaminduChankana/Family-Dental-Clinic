import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createInventoryAction } from "../../actions/InventoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./inventory.css";

export default function InventoryCreate({ history }) {
	const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();
	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const inventoryCreate = useSelector((state) => state.inventoryCreate);
	const { loading, error } = inventoryCreate;

	const resetHandler = () => {
		setProductName("");
		setQuantity("");
		setDescription("");
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!productName || !quantity || !description) return;
		dispatch(createInventoryAction(productName, quantity, description));

		resetHandler();
		history.push("/inventory-view");
	};

	const demoHandler = async (e) => {
		e.preventDefault();
		setProductName("Scalers");
		setQuantity("17");
		setDescription("Curette Debridement Double End 3/4 #10 Immunity Steel Each");
	};

	useEffect(() => {}, []);
	if (adminInfo) {
		return (
			<div className="inventoryCreate" style={{ marginTop: "0px", marginBottom: "0px" }}>
				<MainScreen title="ADMIN CREATE - INVENTORY">
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
					<Card
						style={{ margin: 50, left: "15%", width: "60%", boxShadow: "10px 10px 5px #888888", borderRadius: "20px" }}
					>
						<div>
							<Card.Body>
								<Form onSubmit={submitHandler}>
									{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

									<Form.Group controlId="productName">
										<Form.Label>Product Name</Form.Label>
										<Form.Control
											type="productName"
											value={productName}
											placeholder="Product Name"
											onChange={(e) => setProductName(e.target.value)}
										/>
									</Form.Group>

									<Form.Group controlId="quantity">
										<Form.Label>Quantity</Form.Label>
										<Form.Control
											type="number"
											value={quantity}
											placeholder="Quantity"
											onChange={(e) => setQuantity(e.target.value)}
										/>
									</Form.Group>

									<Form.Group controlId="description">
										<Form.Label>Description</Form.Label>
										<Form.Control
											as="textarea"
											type="description"
											value={description}
											placeholder="Product Description"
											onChange={(e) => setDescription(e.target.value)}
										/>
									</Form.Group>
									{loading && <Loading size={50} />}
									<Button
										type="submit"
										variant="primary"
										style={{ marginRight: "6px", boxShadow: "5px 5px 2px #888888", width: "70px" }}
									>
										Save
									</Button>
									<Button
										variant="info"
										onClick={demoHandler}
										style={{ boxShadow: "5px 5px 2px #888888", width: "70px" }}
									>
										Demo
									</Button>
								</Form>
							</Card.Body>
						</div>
					</Card>
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
}
