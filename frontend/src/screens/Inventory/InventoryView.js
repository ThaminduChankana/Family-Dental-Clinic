import { useHistory, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core/";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInventoryAction, listInventory } from "../../actions/InventoryAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { blue } from "@material-ui/core/colors";

export default function InventoryView({search}) {
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
    <div  className="inventoryView" style={{marginTop:"0px", marginBottom:"0px"}}>
        <Card.Header style={{ backgroundColor: "#cfcfcf" }}>
            <h3 style={{color: "#4f4f4f"}}>INVENTORY CONTROL</h3> 
        </Card.Header>
        
        <div class="container" style={{ width:"280px", float: "right", marginTop:"10px"}}>
                      <div class="row">
                           <div class="col-xs-2" >
                               <Button href={`/inventory-create`} style={{marginRight:"15px"}}>Add Product</Button>
                           </div>
                           <div class="col-xs-4">
                               <Button href={`/inventory-report`} >Generate Report</Button>
                           </div>
                      </div>
                  </div>
<br></br>
        <div style={{padding:"2rem" }} >
            {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
            {loadingDelete && <Loading/>}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading/>}
            {inventory
            ?.reverse()
            .filter((filteredB) => filteredB.productName.includes(search))
            .map((product) => (
                <Grid item xs={12} sm={6} md={3} key={inventory.indexOf(product)} style={{ display:"inline-flex",width: "50rem", borderRadius:"35px" }}>
                    <Card style={{width: "20rem", height: "22rem", margin: 25, left:"10%", borderRadius:"35px"}} key="0">
                        <Card.Header>
                            <h2> {product.productName}</h2>
                        </Card.Header>
                        <Card.Body>
                        <h5>{product.description}</h5>
                            <h5>Quantity: {product.quantity}</h5>
                            <div style={{float:"right"}}>
                            <Button href={`/inventory-update/${product._id}`} style={{borderRadius:"20px", paddingRight:"5px", paddingLeft:"5px", width:"60px"}}>Edit</Button>
                            <Button variant="danger" className="mx-2" onClick={() => deleteHandler(product._id)} style={{borderRadius:"20px", paddingRight:"5px", paddingLeft:"5px", width:"60px"}}>
                                Delete
                            </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Grid>
            ))}
        </div>
    </div>
  )
};
