import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Header from "./components/header/Header";
import LoginSelectorPage from "./screens/SelectorPages/LoginSelector/LoginSelectorPage";
import FeedbackSelectorPage from "./screens/SelectorPages/FeedBackSelector/FeedBackSelector";
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
import PatientOperationPage from "./screens/OperationPages/PatientOperationPage";
import DoctorListForAdmin from "./screens/AdminLists/doctorList";
import PatientListForAdmin from "./screens/AdminLists/patientList";
import PatientListForDoctor from "./screens/DoctorLists/patientList";
import DoctorEditByAdmin from "./screens/UserManagement/AdminUserEditScreens/DoctorEditByAdmin";
import PatientPrint from "./screens/Reports/PatientReports/PatientPrint";
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
import InventoryCreate from "./screens/Inventory/InventoryCreate";
import InventoryView from "./screens/Inventory/InventoryView";
import TreatmentNavBar from "./screens/Treatment/TreatmentDashBoard/TreatmentNavBar";
import BasicTreatmentView from "./screens/Treatment/TreatmentLists/BasicTreatmentView";
import FillingView from "./screens/Treatment/TreatmentLists/FillingView";
import OrthodonticView from "./screens/Treatment/TreatmentLists/OrthodonticView";
import BasicTreatmentCreate from "./screens/Treatment/TreatmentCreateScreens/BasicTreatmentCreate";
import FillingCreate from "./screens/Treatment/TreatmentCreateScreens/FillingCreate";
import OrthodonticCreate from "./screens/Treatment/TreatmentCreateScreens/OrthodonticCreate";
import SingleBasicTreatment from "./screens/Treatment/TreatmentEditScreens/SingleBasicTreatment";
import SingleFilling from "./screens/Treatment/TreatmentEditScreens/SingleFilling";
import SingleOrthodontic from "./screens/Treatment/TreatmentEditScreens/SingleOrthodontic";
import TreatmentPrint from "./screens/Reports/TreatmentReports/TreatmentPrint";
import Footer from "./components/footer/footer";
import DoctorArticles from "./screens/Blogs/DoctorArticles";
import CreateArticle from "./screens/Blogs/CreateArticle";
import SingleArticle from "./screens/Blogs/SingleArticle";
import CommonBlogs from "./screens/Blogs/CommonBlogs";
import BlogPrint from "./screens/Reports/BlogReports/BlogPrint";
import AccessDenied from "./components/AccessDenied";


const App = () => {
	const [search, setSearch] = useState("");
	return (
		<BrowserRouter>
			<Header setSearch={setSearch} />
			<main>
				<Route path="/" component={LoginSelectorPage} exact />
				<Route path="/access-denied" component={AccessDenied} exact />
				<Route path="/admin-feedback-Q&A" component={FeedbackSelectorPage} exact />
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
				<Route path="/patient" component={PatientOperationPage} exact />
				<Route path="/admin-doctors" component={() => <DoctorListForAdmin search={search} />} exact />
				<Route path="/admin-patients" component={() => <PatientListForAdmin search={search} />} exact />
				<Route path="/doctor-patients" component={() => <PatientListForDoctor search={search} />} exact />
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
				<Route path="/admin-patient-report" component={PatientPrint} exact />
				<Route path="/inventory-create" component={InventoryCreate} exact></Route>
				<Route path="/inventory-view" component={InventoryView} exact></Route>
				<Route path="/treatment-navbar" component={TreatmentNavBar} exact />
				<Route path="/treatment-basicTreatment-view" component={() => <BasicTreatmentView search={search} />} exact />
				<Route path="/treatment-filling-view" component={() => <FillingView search={search} />} exact />
				<Route path="/treatment-orthodontic-view" component={() => <OrthodonticView search={search} />} exact />
				<Route path="/treatment-basicTreatment-create" component={BasicTreatmentCreate} exact />
				<Route path="/treatment-filling-create" component={FillingCreate} exact />
				<Route path="/treatment-orthodontic-create" component={OrthodonticCreate} exact />
				<Route path="/basicTreatment/:id" component={SingleBasicTreatment} exact />
				<Route path="/filling/:id" component={SingleFilling} exact />
				<Route path="/orthodontic/:id" component={SingleOrthodontic} exact />
				<Route path="/treatment-report" component={TreatmentPrint} exact />
				<Route path="/doctor-articles" component={() => <DoctorArticles search={search} />} exact />
				<Route path="/doctor-create-article" component={CreateArticle} exact />
				<Route path="/doctor-single-article/:id" component={SingleArticle} exact />
				<Route path="/articles" component={() => <CommonBlogs search={search} />} exact />
				<Route path="/admin-blog-report" component={BlogPrint} exact />

			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
