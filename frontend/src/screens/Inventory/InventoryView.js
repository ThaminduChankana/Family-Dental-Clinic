import { useHistory, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInventoryAction, listInventory } from "../../actions/InventoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function InventoryView() {
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
		if (window.confirm("Are you Sure?")) {
			dispatch(deleteInventoryAction(id));
		}
	};

	const history = useHistory();
	useEffect(() => {
		// if (!adminInfo) {
		// history.pushState("/");
		dispatch(listInventory());
		//}
	}, [dispatch, history.push, adminInfo, successUpdate, successDelete]);

	return (
		<div>
			<Card.Header>
				<h3 style={{ color: "darkgray" }}>INVENTORY CONTROL</h3>
				<div class="align-right">
					{/* <div className="right-side">
                    <Button style={{left:"200%", marginLeft: 1400}} href={`/inventory-create`} >Add Product</Button>
                 </div>
              <div className="left-side">
                    <Button style={{left:"200%", marginLeft: 1000}} href={``} >Generate Report</Button>
              </div> */}
				</div>
			</Card.Header>

			<div style={{ padding: "2rem" }}>
				{errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
				{loadingDelete && <Loading />}
				{error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
				{loading && <Loading />}
				{inventory?.map((product) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						key={inventory.indexOf(product)}
						style={{ display: "inline-flex", width: "50rem" }}
					>
						<Card style={{ width: "20rem", height: "22rem", margin: 25, left: "10%" }} key="0">
							<Card.Header>
								<h2>Product Name: {product.productName}</h2>
							</Card.Header>
							<Card.Body>
								<h5>{product.description}</h5>
								<h5>Quantity: {product.quantity}</h5>

								<Button href={`/inventory/${product._id}`}>Edit</Button>
								<Button variant="danger" className="mx-2" onClick={() => deleteHandler(product._id)}>
									Delete
								</Button>
							</Card.Body>
						</Card>
					</Grid>
				))}
			</div>
		</div>
	);
}
