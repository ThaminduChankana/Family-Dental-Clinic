import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import LandingPage from "./screens/LandingPage/LandingPage";
import AdminRegisterScreen from "./screens/UserManagement/RegisterScreens/AdminRegisterScreen";
import DoctorRegisterScreen from "./screens/UserManagement/RegisterScreens/DoctorRegisterScreen";
import PatientRegisterScreen from "./screens/UserManagement/RegisterScreens/PatientRegisterScreen";
import AdminLoginScreen from "./screens/UserManagement/LoginScreens/AdminLoginScreen";
import DoctorLoginScreen from "./screens/UserManagement/LoginScreens/DoctorLoginScreen";
import PatientLoginScreen from "./screens/UserManagement/LoginScreens/PatientLoginScreen";
import AdminViewScreen from "./screens/UserManagement/ViewScreens/AdminViewScreen";
import DoctorViewScreen from "./screens/UserManagement/ViewScreens/DoctorViewScreen";
import PatientViewScreen from "./screens/UserManagement/ViewScreens/PatientViewScreen";
import AdminEditScreen from "./screens/UserManagement/EditScreens/AdminEditScreen";
import PatientEditScreen from "./screens/UserManagement/EditScreens/PatientEditScreen";
import DoctorEditScreen from "./screens/UserManagement/EditScreens/DoctorEditScreen";
import AdminOperationPage from "./screens/OperationPages/AdminOperarionPage";
import DoctorOperationPage from "./screens/OperationPages/DoctorOperationPage";
import DoctorListForAdmin from "./screens/AdminLists/doctorList";
import PatientListForAdmin from "./screens/AdminLists/patientList";
import PatientListForDoctor from "./screens/DoctorLists/patientList";
import DoctorEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/DoctorEditByAdmin";
import PatientEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/PatientEditByAdmin";
import DiagnosisInfo from "./screens/Treatment/TreatmentDashBoard/DiagnosisInfo";
import TreatmentNavBar from "./screens/Treatment/TreatmentDashBoard/TreatmentNavBar";
import BasicTreatmentView from "./screens/Treatment/TreatmentLists/BasicTreatmentView";
import FillingView from "./screens/Treatment/TreatmentLists/FillingView";
import OrthodonticView from "./screens/Treatment/TreatmentLists/OrthodonticView";
import BasicTreatmentCreate from "./screens/Treatment/TreatmentCreateScreens/BasicTreatmentCreate";
import FillingCreate from "./screens/Treatment/TreatmentCreateScreens/FillingCreate";
import OrthodonticCreate from "./screens/Treatment/TreatmentCreateScreens/OrthodonticCreate";
const App = () => {
	return (
		<BrowserRouter>
			<main>
				<Route path="/" component={LandingPage} exact />
				<Route path="/admin-register" component={AdminRegisterScreen} exact />
				<Route path="/doctor-register" component={DoctorRegisterScreen} exact />
				<Route path="/patient-register" component={PatientRegisterScreen} exact />
				<Route path="/admin-login" component={AdminLoginScreen} exact />
				<Route path="/doctor-login" component={DoctorLoginScreen} exact />
				<Route path="/patient-login" component={PatientLoginScreen} exact />
				<Route path="/admin-view" component={AdminViewScreen} exact />
				<Route path="/doctor-view" component={DoctorViewScreen} exact />
				<Route path="/patient-view" component={PatientViewScreen} exact />
				<Route path="/admin-edit" component={AdminEditScreen} exact />
				<Route path="/doctor-edit" component={DoctorEditScreen} exact />
				<Route path="/patient-edit" component={PatientEditScreen} exact />
				<Route path="/admin" component={AdminOperationPage} exact />
				<Route path="/doctor" component={DoctorOperationPage} exact />
				<Route path="/admin-doctors" component={DoctorListForAdmin} exact />
				<Route path="/admin-patients" component={PatientListForAdmin} exact />
				<Route path="/doctor-patients" component={PatientListForDoctor} exact />
				<Route path="/admin-doctor-edit/:id" component={DoctorEditByAdmin} exact />
				<Route path="/admin-patient-edit/:id" component={PatientEditByAdmin} exact />
				<Route path="/treatment-dashboard" component={DiagnosisInfo} exact />
				<Route path="/treatment-navbar" component={TreatmentNavBar} exact />
				<Route path="/treatment-basicTreatment-view" component={BasicTreatmentView} exact />
				<Route path="/treatment-filling-view" component={FillingView} exact />
				<Route path="/treatment-orthodontic-view" component={OrthodonticView} exact />
				<Route path="/treatment-basicTreatment-create" component={BasicTreatmentCreate} exact />
				<Route path="/treatment-filling-create" component={FillingCreate} exact />
				<Route path="/treatment-orthodontic-create" component={OrthodonticCreate} exact />
			</main>
		</BrowserRouter>
	);
};

export default App;
