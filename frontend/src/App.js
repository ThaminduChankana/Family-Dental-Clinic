import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import DiagnosisInfo from "./screens/Treatment/DiagnosisInfo";
import FillingCreate from "./screens/Treatment/FillingCreate";
import OrthodonticCreate from "./screens/Treatment/OrthodonticCreate";
import BasicTreatmentCreate from "./screens/Treatment/BasicTreatmentCreate";
import SingleBasicTreatment from "./screens/Treatment/SingleBasicTreatment";
import BasicTreatmentView from "./screens/Treatment/BasicTreatmentView";
import OrthodonticView from "./screens/Treatment/OrthodonticView";
import SingleOrthodontic from "./screens/Treatment/SingleOrthodontic";
import FillingView from "./screens/Treatment/FillingView";
import SingleFilling from "./screens/Treatment/SingleFilling";

const App = () => {
	return (
		<BrowserRouter>
			<main>
				<Route path="/" component={LandingPage} exact></Route>
				<Route path="/treatment-dashboard" component={DiagnosisInfo} exact></Route>
				<Route path="/treatment-filling-create" component={FillingCreate} exact></Route>
				<Route path="/treatment-orthodontic-create" component={OrthodonticCreate} exact></Route>
				<Route path="/treatment-basicTreatment-create" component={BasicTreatmentCreate} exact></Route>
				<Route path="/basicTreatment/:id" component={SingleBasicTreatment} exact></Route>
				<Route path="/treatment-basicTreatment-view" component={BasicTreatmentView} exact></Route>
				<Route path="/treatment-orthodontic-view" component={OrthodonticView} exact></Route>
				<Route path="/orthodontic/:id" component={SingleOrthodontic} exact></Route>
				<Route path="/treatment-filling-view" component={FillingView} exact></Route>
				<Route path="/filling/:id" component={SingleFilling} exact></Route>
			</main>
		</BrowserRouter>
	);
};

export default App;
