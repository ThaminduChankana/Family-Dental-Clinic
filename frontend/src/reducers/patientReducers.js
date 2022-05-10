import {
	PATIENT_LOGIN_FAIL,
	PATIENT_LOGIN_REQUEST,
	PATIENT_LOGIN_SUCCESS,
	PATIENT_LOGOUT,
	PATIENT_REGISTER_FAIL,
	PATIENT_REGISTER_REQUEST,
	PATIENT_REGISTER_SUCCESS,
	PATIENT_VIEW_FAIL,
	PATIENT_VIEW_REQUEST,
	PATIENT_VIEW_SUCCESS,
	PATIENT_UPDATE_FAIL,
	PATIENT_UPDATE_REQUEST,
	PATIENT_UPDATE_SUCCESS,
	PATIENT_DELETE_FAIL,
	PATIENT_DELETE_REQUEST,
	PATIENT_DELETE_SUCCESS,
	PATIENT_LIST_FAIL,
	PATIENT_LIST_REQUEST,
	PATIENT_LIST_SUCCESS,
	PATIENT_LIST_FOR_DOCTOR_FAIL,
	PATIENT_LIST_FOR_DOCTOR_REQUEST,
	PATIENT_LIST_FOR_DOCTOR_SUCCESS,
	PATIENT_VIEW_BY_ID_FAIL,
	PATIENT_VIEW_BY_ID_REQUEST,
	PATIENT_VIEW_BY_ID_SUCCESS,
	PATIENT_UPDATE_BY_ID_FAIL,
	PATIENT_UPDATE_BY_ID_REQUEST,
	PATIENT_UPDATE_BY_ID_SUCCESS,
} from "../constants/patientConstants";

export const patientLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_LOGIN_REQUEST:
			return { loading: true };
		case PATIENT_LOGIN_SUCCESS:
			return { loading: false, patientInfo: action.payload };
		case PATIENT_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case PATIENT_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const patientRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_REGISTER_REQUEST:
			return { loading: true };
		case PATIENT_REGISTER_SUCCESS:
			return { loading: false, patientInfo: action.payload };
		case PATIENT_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const patientViewReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_VIEW_REQUEST:
			return { loading: true };
		case PATIENT_VIEW_SUCCESS:
			return { loading: false, patientInfo: action.payload };
		case PATIENT_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const patientUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_UPDATE_REQUEST:
			return { loading: true };
		case PATIENT_UPDATE_SUCCESS:
			return { loading: false, patientInfo: action.payload, success: true };
		case PATIENT_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const patientDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_DELETE_REQUEST:
			return { loading: true };
		case PATIENT_DELETE_SUCCESS:
			return { loading: false, patientInfo: action.payload, success: true };
		case PATIENT_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const patientListReducer = (state = { patients: [] }, action) => {
	switch (action.type) {
		case PATIENT_LIST_REQUEST:
			return { loading: true };
		case PATIENT_LIST_SUCCESS:
			return { loading: false, patients: action.payload };
		case PATIENT_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const patientListForDoctorReducer = (state = { patients: [] }, action) => {
	switch (action.type) {
		case PATIENT_LIST_FOR_DOCTOR_REQUEST:
			return { loading: true };
		case PATIENT_LIST_FOR_DOCTOR_SUCCESS:
			return { loading: false, patients: action.payload };
		case PATIENT_LIST_FOR_DOCTOR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const patientViewByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case PATIENT_VIEW_BY_ID_SUCCESS:
			return { loading: false, patientInfo: action.payload, success: true };
		case PATIENT_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const patientUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case PATIENT_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case PATIENT_UPDATE_BY_ID_SUCCESS:
			return { loading: false, patientInfo: action.payload, success: true };
		case PATIENT_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
