import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import InventoryCreate from "./screens/Inventory/InventoryCreate";
import InventoryView from "./screens/Inventory/InventoryView"


const App = () => {
	return (
		<BrowserRouter>
			<main>
				
		
				<Route path="/inventory-create" component={InventoryCreate} exact></Route>
				<Route path="/inventory-view" component={InventoryView} exact></Route>
			</main>
		</BrowserRouter>
	);
};

export default App;

/*function App() {
	return <div className="App">Hello World</div>;
}

export default App;*/
