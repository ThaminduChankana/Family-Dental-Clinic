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
import DoctorListForAdmin from "./screens/AdminLists/doctorList";
import PatientListForAdmin from "./screens/AdminLists/patientList";
import PatientListForDoctor from "./screens/DoctorLists/patientList";
import DoctorEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/DoctorEditByAdmin";
import PatientEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/PatientEditByAdmin";
import FeedbackCreate from "./screens/Feedback/FeedbackCreateSreens/FeedbackCreate";
import QuestionCreate from "./screens/Question/QuestionCreateScreens/QuestionCreate";
import FeedbackViewforAdmin from "./screens/Feedback/FeedbackLists/FeedbackViewforAdmin";
import QuestionViewforAdmin from "./screens/Question/QuestionLists/QuestionViewforAdmin";
import PatientFeedbackEdit from "./screens/Feedback/FeedbackEditScreens/PatientFeedbackEdit";
import PaitentQuestionEdit from "./screens/Question/QuestionEditScreens/PatientQuestionEdit";
import SingleFeedback from "./screens/Feedback/FeedbackEditScreens/SingleFeedback";
import FeedbackViewforPatient from "./screens/Feedback/FeedbackLists/FeedbackViewForPatient";
import CommonViewFeedback from "./screens/Feedback/FeedbackLists/CommonViewFeedback";
import QuestionViewforPatient from "./screens/Question/QuestionLists/QuestionViewforPatient";
import AdminQuestionEdit from "./screens/Question/QuestionEditScreens/AdminQuestionEdit";

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
				<Route path="/admin-doctors" component={DoctorListForAdmin} exact />
				<Route path="/admin-patients" component={PatientListForAdmin} exact />
				<Route path="/doctor-patients" component={PatientListForDoctor} exact />
				<Route path="/admin-doctor-edit/:id" component={DoctorEditByAdmin} exact />
				<Route path="/admin-patient-edit/:id" component={PatientEditByAdmin} exact />
				<Route path="/feedback-create" component={FeedbackCreate} exact />
				<Route path="/question-create" component={QuestionCreate} exact />
				<Route path="/feedback-adminview" component={FeedbackViewforAdmin} exact />
				<Route path="/question-adminview" component={QuestionViewforAdmin} exact />
				<Route path="/feedback-update-patient/:id" component={PatientFeedbackEdit} exact />
				<Route path="/question-update-patient/:id" component={PaitentQuestionEdit} exact />
				<Route path="/feedback-update-admin/:id" component={SingleFeedback} exact />
				<Route path="/feedback-view-patient" component={FeedbackViewforPatient} exact />
				<Route path="/common-view-feedback" component={CommonViewFeedback} exact />
				<Route path="/question-view-patient" component={QuestionViewforPatient} exact />
				<Route path="/question-update-admin/:id" component={AdminQuestionEdit} exact />
			</main>
		</BrowserRouter>
	);
};

export default App;
