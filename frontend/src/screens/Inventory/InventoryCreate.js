import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createInventoryAction } from "../../actions/InventoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

export default function InventoryCreate({history}) {
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    const inventoryCreate = useSelector((state) => state.inventoryCreate);
    const { loading, error, inventory } = inventoryCreate;

    console.log(inventory);

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
        alert("Successfully Created.")
    };



    useEffect(() => {}, []);
    return ( 
        <div> 
                <Card.Header>
                 <h3 style={{color: "darkgray"}}>Add Inventory</h3>
             </Card.Header>
           <Card style={{margin:50, left:"30%", width:"40%"}}>
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
                       <Button type="submit" variant="primary">
                           Save
                       </Button>
                    </Form>
               </Card.Body>
               </div>
            </Card>
        </div>
    );
}