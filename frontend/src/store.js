import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extention";

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
	patientLoginReducer,
	patientRegisterReducer,
	patientViewReducer,
	patientUpdateReducer,
	patientListReducer,
	patientViewByIdReducer,
	patientUpdateByIdReducer,
	patientDeleteReducer,
} from "./reducers/patientReducers";

import {
	inventoryListReducer,
	inventoryCreateReducer,
	inventoryUpdateReducer,
	inventoryDeleteReducer,
} from "./reducers/InventoryReducer";

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
	inventoryList: inventoryListReducer,
	inventoryCreate: inventoryCreateReducer,
	inventoryUpdate: inventoryUpdateReducer,
	inventoryDelete: inventoryDeleteReducer,
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
