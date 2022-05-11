import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Header from "./components/header/Header";
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
import DoctorListForAdmin from "./screens/AdminLists/doctorList";
import PatientListForAdmin from "./screens/AdminLists/patientList";
import PatientListForDoctor from "./screens/DoctorLists/patientList";
import DoctorEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/DoctorEditByAdmin";
import PatientEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/PatientEditByAdmin";
import InventoryCreate from "./screens/Inventory/InventoryCreate";
import InventoryView from "./screens/Inventory/InventoryView";



const App = () => {
	return (
		<BrowserRouter>
			<Header />
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
				<Route path="/admin-doctors" component={DoctorListForAdmin} exact />
				<Route path="/admin-patients" component={PatientListForAdmin} exact />
				<Route path="/doctor-patients" component={PatientListForDoctor} exact />
				<Route path="/admin-doctor-edit/:id" component={DoctorEditByAdmin} exact />
				<Route path="/admin-patient-edit/:id" component={PatientEditByAdmin} exact />
				<Route path="/inventory-create" component={InventoryCreate} exact></Route>
				<Route path="/inventory-view" component={InventoryView} exact></Route>

			</main>
		</BrowserRouter>
	);
};


export default App;

