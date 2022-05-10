import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { TreatmentReport } from "./TreatmentReport";
const TreatmentPrint = () => {
	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div>
			<TreatmentReport ref={componentRef} />
			<button onClick={handlePrint}>Print this out!</button>
		</div>
	);
};

export default TreatmentPrint;
