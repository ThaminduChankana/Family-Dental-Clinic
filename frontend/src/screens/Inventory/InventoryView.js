import { useHistory } from "react-router-dom";
import { Card, ButtonGroup, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInventoryAction, listInventory } from "../../actions/InventoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import swal from "sweetalert";

export default function InventoryView({ search }) {
	const dispatch = useDispatch();

	const admin_Login = useSelector((state) => state.admin_Login);
	const { adminInfo } = admin_Login;

	const inventoryList = useSelector((state) => state.inventoryList);
	const { loading, inventory, error } = inventoryList;

	const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
	const { success: successUpdate } = inventoryUpdate;

	const inventoryDelete = useSelector((state) => state.inventoryDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = inventoryDelete;

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

	const history = useHistory();
	useEffect(() => {
		dispatch(listInventory());
	}, [dispatch, history.push, adminInfo, successUpdate, successDelete]);

	if (adminInfo) {
		return (
			<div className="inventoryView" style={{ marginTop: "0px", marginBottom: "0px" }}>
				<MainScreen title={`Welcome Back ${adminInfo && adminInfo.name}..`}>
					<br></br>
					<ButtonGroup className="mb-2" size="lg" style={{ width: "100%" }}>
						<Button href="/admin">Back to operations page</Button>

						<Button href="/inventory-create">+ Add Product </Button>

						<Button href="/inventory-report">Inventory Report</Button>
					</ButtonGroup>
					<div className="container" style={{ width: "280px", float: "right", marginTop: "10px" }}>
						<div className="row"></div>
					</div>
					<br></br>

					<div style={{ padding: "2rem" }}>
						{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
						{loadingDelete && <Loading />}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
						{loading && <Loading />}
						{inventory
							?.reverse()
							.filter((filteredB) => filteredB.productName.includes(search))
							.map((product) => (
								<Grid
									item
									xs={12}
									sm={5}
									md={4}
									key={inventory.indexOf(product)}
									style={{ display: "inline-flex", width: "500px", borderRadius: "35px" }}
								>
									<Card
										style={{
											width: "600px",
											height: "22rem",
											margin: 25,
											borderRadius: "35px",
											boxShadow: "10px 10px 5px #888888",
										}}
										key="0"
									>
										<Card.Header style={{ borderRadius: "35px", margin: 5, background: "rgba(231, 238, 238, 0.8)" }}>
											<h2> {product.productName}</h2>
										</Card.Header>
										<Card.Body>
											<h5>{product.description}</h5>
											<h5>Quantity: {product.quantity}</h5>
											<div style={{ float: "right" }}>
												<Button
													href={`/inventory-update/${product._id}`}
													style={{
														borderRadius: "20px",
														paddingRight: "5px",
														paddingLeft: "5px",
														width: "70px",
														boxShadow: "5px 5px 2px #888888",
													}}
												>
													Edit
												</Button>
												<Button
													variant="danger"
													className="mx-2"
													onClick={() => deleteHandler(product._id)}
													style={{
														borderRadius: "20px",
														paddingRight: "5px",
														paddingLeft: "5px",
														width: "70px",
														boxShadow: "5px 5px 2px #888888",
													}}
												>
													Delete
												</Button>
											</div>
										</Card.Body>
									</Card>
								</Grid>
							))}
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
}
