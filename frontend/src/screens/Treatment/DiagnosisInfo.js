import BasicTreatmentView from "./BasicTreatmentView";
import OrthodonticView from "./OrthodonticView";
import FillingView from "./FillingView";

const DiagnosisInfo = () => {
	return (
		<div>
			<div>diagnosisInfo</div>
			<a href="/treatment-orthodontic-create">Orthodontic</a>
			<a href="/treatment-filling-create">Filling</a>
			<a href="/treatment-basicTreatment-create">Basic Treatment</a>
			<h1>Basic Treatments List</h1>
			<BasicTreatmentView />
			<h1>Orthodontic Treatments List</h1>
			<OrthodonticView />
			<h1>Filling Treatments List</h1>
			<FillingView />
		</div>
	);
};

export default DiagnosisInfo;
