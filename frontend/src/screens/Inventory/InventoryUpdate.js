import React, {useEffect, useState} from "react";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { updateInventoryAction } from "../../actions/InventoryAction";
import { authHeader } from "../../actions/adminActions";

export default function InventoryUpdate({match,history}){
    const [productName, setProductName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [description, setDescription] = useState("");

	const dispatch = useDispatch();

	const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
	const { loading } = inventoryUpdate;
    useEffect (() => {
        const fetching = async () => {
            const {data} = await axios.get (
               `http://localhost:5000/user/admin/inventory/get/${match.params.id}`,
                 {
                   headers: authHeader(),
                   "Access-Control-Allow-Origin": "*",
				    "Access-Control-Allow-Credentials": true,
                 }
                 );
console.log(data);
            setProductName(data.productName);
            setQuantity(data.quantity);
            setDescription(data.description);
        };

        fetching();
    }, [match.params.id]);

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateInventoryAction(match.params.id, productName, quantity, description));
        if(!productName || !quantity || !description) return;

        history.push("/inventory-view");
    };

    return (
        <div  className="inventoryUpdate" style={{marginTop:"0px", marginBottom:"0px"}}>
           <Card.Header style={{ backgroundColor: "#cfcfcf" }}>
				<h3 style={{ color: "#4f4f4f" }}>Update Inventory Details</h3>
			</Card.Header>
			<Card style={{ margin: 50, left: "30%", width: "40%" }}>
				<div>
					<Card.Body>
                        <form onSubmit={updateHandler}>

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
    							<Button type="submit" variant="primary">
    								Update
    							</Button>
                        </form>
                    </Card.Body>
                </div>
            </Card>
        </div>
    )
}