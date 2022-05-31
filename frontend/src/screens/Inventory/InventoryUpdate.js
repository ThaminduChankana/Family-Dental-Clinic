import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { updateInventoryAction, deleteInventoryAction } from "../../actions/InventoryAction";
import { authHeader } from "../../actions/adminActions";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import swal from "sweetalert";

export default function InventoryUpdate({ match, history }) {
	const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
	const { loading, error } = inventoryUpdate;

	const inventoryDelete = useSelector((state) => state.inventoryDelete);
	const { loading: loadingDelete, error: errorDelete } = inventoryDelete;
	const deleteHandler = (id) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover these details!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					dispatch(deleteInventoryAction(id));
					swal({
						title: "Success!",
						text: "Deleted Inventory Successfully",
						icon: "success",
						timer: 2000,
						button: false,
					});
					history.push("/inventory-view");
				}
			})
			.catch((err) => {
				swal({
					title: "Error!",
					text: "Couldn't Delete Inventory",
					type: "error",
				});
			});
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/user/admin/inventory/get/${match.params.id}`, {
				headers: authHeader(),
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Credentials": true,
			});

			setProductName(data.productName);
			setQuantity(data.quantity);
			setDescription(data.description);
		};

		fetching();
	}, [match.params.id]);

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateInventoryAction(match.params.id, productName, quantity, description));
		if (!productName || !quantity || !description) return;
	};

	if (adminInfo) {
		return (
			<div className="inventoryUpdate" style={{ marginTop: "0px", marginBottom: "0px" }}>
				<MainScreen title="ADMIN UPDATE - INVENTORY">
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
						style={{
							margin: 50,
							left: "15%",
							right: "15%",
							boxShadow: "10px 10px 5px #888888",
							borderRadius: "20px",
							width: "60%",
						}}
					>
						<div>
							<Card.Body>
								<Form onSubmit={updateHandler}>
									{loadingDelete && <Loading />}
									{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
									{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
									<Form.Group controlId="productName">
										<Form.Label>Product Name</Form.Label>
										<Form.Control
											type="productName"
											value={productName}
											placeholder="Product Name"
											onChange={(e) => setProductName(e.target.value)}
											required
										/>
									</Form.Group>

									<Form.Group controlId="quantity">
										<Form.Label>Quantity</Form.Label>
										<Form.Control
											type="number"
											value={quantity}
											placeholder="Quantity"
											onChange={(e) => setQuantity(e.target.value)}
											required
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
											required
										/>
									</Form.Group>
									{loading && <Loading size={50} />}

									<Button
										style={{ fontSize: 15, marginTop: 10, boxShadow: "5px 5px 2px #888888" }}
										type="submit"
										variant="primary"
									>
										Submit
									</Button>
									<Button
										style={{ fontSize: 15, marginTop: 10, boxShadow: "5px 5px 2px #888888" }}
										className="mx-2"
										variant="danger"
										onClick={() => deleteHandler(match.params.id)}
									>
										Delete
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
