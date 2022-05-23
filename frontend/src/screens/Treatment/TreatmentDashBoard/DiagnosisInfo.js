import BasicTreatmentView from "../TreatmentLists/BasicTreatmentView";
import OrthodonticView from "../TreatmentLists/OrthodonticView";
import FillingView from "../TreatmentLists/FillingView";
import TreatmentNavBar from "./TreatmentNavBar";

const DiagnosisInfo = () => {
	return (
		<div>
			<TreatmentNavBar />
			<br />
			<br />
			<h2 style={{ textAlign: "center" }}>Basic Treatment List</h2>
			<BasicTreatmentView />
			<br />
			<br />
			<h2 style={{ textAlign: "center" }}>Orthodontic Treatment List</h2>
			<OrthodonticView />
			<br />
			<br />
			<h2 style={{ textAlign: "center" }}>Filling Treatment List</h2>
			<FillingView />
		</div>
	);
};

export default DiagnosisInfo;
