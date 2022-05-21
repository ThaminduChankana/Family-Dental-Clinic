import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	adminLoginReducer,
	adminRegisterReducer,
	adminViewReducer,
	adminUpdateReducer,
} from "./reducers/adminReducers";
import {
	doctorLoginReducer,
	doctorRegisterReducer,
	doctorViewReducer,
	doctorUpdateReducer,
	doctorListReducer,
	doctorViewByIdReducer,
	doctorUpdateByIdReducer,
	doctorDeleteReducer,
} from "./reducers/doctorReducers";

import {
	createFeedbackReducer,
	deleteFeedbackforAdminReducer,
	deleteFeedbackReducer,
	getFeedbackCommonReviewPageReducer,
	getFeedbackforAdminReducer,
	getFeedbackReducer,
	UpdateFeedbackforAdminReducer,
	updateFeedbackReducer,
} from "./reducers/feedbackReducer";

import {
	createQuestionReducer,
	deleteQuestionforAdminReducer,
	deleteQuestionReducer,
	getQuestionForAdminReducer,
	getQuestionReducer,
	UpdateQuestionforAdminReducer,
	updateQuestionReducer,
} from "./reducers/questionReducer";

import {
	patientLoginReducer,
	patientRegisterReducer,
	patientViewReducer,
	patientUpdateReducer,
	patientListReducer,
	patientViewByIdReducer,
	patientUpdateByIdReducer,
	patientDeleteReducer,
} from "./reducers/patientReducers";

const reducer = combineReducers({
	admin_Login: adminLoginReducer,
	adminRegistration: adminRegisterReducer,
	adminView: adminViewReducer,
	adminUpdate: adminUpdateReducer,
	doctor_Login: doctorLoginReducer,
	doctorRegistration: doctorRegisterReducer,
	doctorView: doctorViewReducer,
	doctorUpdate: doctorUpdateReducer,
	doctorList: doctorListReducer,
	doctorDelete: doctorDeleteReducer,
	doctorViewById: doctorViewByIdReducer,
	doctorUpdateById: doctorUpdateByIdReducer,
	patient_Login: patientLoginReducer,
	patientRegistration: patientRegisterReducer,
	patientView: patientViewReducer,
	patientUpdate: patientUpdateReducer,
	patientList: patientListReducer,
	patientDelete: patientDeleteReducer,
	patientViewById: patientViewByIdReducer,
	patientUpdateById: patientUpdateByIdReducer,
	getFeedback: getFeedbackReducer,
	createFeedback: createFeedbackReducer,
	updateFeedback: updateFeedbackReducer,
	deleteFeedback: deleteFeedbackReducer,
	getFeedbackforAdmin: getFeedbackforAdminReducer,
	UpdateFeedbackforAdmin: UpdateFeedbackforAdminReducer,
	deleteFeedbackforAdmin: deleteFeedbackforAdminReducer,
	getQuestion: getQuestionReducer,
	createQuestion: createQuestionReducer,
	updateQuestion: updateQuestionReducer,
	deleteQuestion: deleteQuestionReducer,
	getQuestionForAdmin: getQuestionForAdminReducer,
	UpdateQuestionforAdmin: UpdateQuestionforAdminReducer,
	deleteQuestionforAdmin: deleteQuestionforAdminReducer,
	getFeedbackCommonReviewPage: getFeedbackCommonReviewPageReducer,
});

const adminInfoFromStorage = localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null;
const doctorInfoFromStorage = localStorage.getItem("doctorInfo")
	? JSON.parse(localStorage.getItem("doctorInfo"))
	: null;
const patientInfoFromStorage = localStorage.getItem("patientInfo")
	? JSON.parse(localStorage.getItem("patientInfo"))
	: null;

const initialState = {
	admin_Login: { adminInfo: adminInfoFromStorage },
	doctor_Login: { doctorInfo: doctorInfoFromStorage },
	patient_Login: { patientInfo: patientInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
