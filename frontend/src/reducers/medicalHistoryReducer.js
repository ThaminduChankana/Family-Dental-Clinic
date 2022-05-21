import {
	MEDICALHISTORY_CREATE_FAIL,
	MEDICALHISTORY_CREATE_REQUEST,
	MEDICALHISTORY_CREATE_SUCCESS,
	MEDICALHISTORY_DELETE_FAIL,
	MEDICALHISTORY_DELETE_REQUEST,
	MEDICALHISTORY_DELETE_SUCCESS,
	MEDICALHISTORY_LIST_FAIL,
	MEDICALHISTORY_LIST_REQUEST,
	MEDICALHISTORY_LIST_SUCCESS,
	MEDICALHISTORY_UPDATE_FAIL,
	MEDICALHISTORY_UPDATE_REQUEST,
	MEDICALHISTORY_UPDATE_SUCCESS,
	MEDICALHISTORY_LIST_DOCTOR_REQUEST,
	MEDICALHISTORY_LIST_DOCTOR_SUCCESS,
	MEDICALHISTORY_LIST_DOCTOR_FAIL,
	MEDICALHISTORY_VIEW_PATIENT_REQUEST,
	MEDICALHISTORY_VIEW_PATIENT_SUCCESS,
	MEDICALHISTORY_VIEW_PATIENT_FAIL,
} from "../constants/medicalHistoryConstants";

export const medicalHistoryListReducer = (state = { medicalHistories: [] }, action) => {
	switch (action.type) {
		case MEDICALHISTORY_LIST_REQUEST:
			return { loading: true };
		case MEDICALHISTORY_LIST_SUCCESS:
			return { loading: false, medicalHistories: action.payload };
		case MEDICALHISTORY_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const medicalHistoryCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case MEDICALHISTORY_CREATE_REQUEST:
			return { loading: true };
		case MEDICALHISTORY_CREATE_SUCCESS:
			return { loading: false, success: true };
		case MEDICALHISTORY_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const medicalHistoryUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case MEDICALHISTORY_UPDATE_REQUEST:
			return { loading: true };
		case MEDICALHISTORY_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case MEDICALHISTORY_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const medicalHistoryDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case MEDICALHISTORY_DELETE_REQUEST:
			return { loading: true };
		case MEDICALHISTORY_DELETE_SUCCESS:
			return { loading: false, success: true };
		case MEDICALHISTORY_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const medicalHistoryListDoctorReducer = (state = { medicalHistories: [] }, action) => {
	switch (action.type) {
		case MEDICALHISTORY_LIST_DOCTOR_REQUEST:
			return { loading: true };
		case MEDICALHISTORY_LIST_DOCTOR_SUCCESS:
			return { loading: false, medicalHistories: action.payload };
		case MEDICALHISTORY_LIST_DOCTOR_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const patientViewMedicalHistoryReducer = (state = {}, action) => {
	switch (action.type) {
		case MEDICALHISTORY_VIEW_PATIENT_REQUEST:
			return { loading: true };
		case MEDICALHISTORY_VIEW_PATIENT_SUCCESS:
			return { loading: false, success: true };
		case MEDICALHISTORY_VIEW_PATIENT_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
