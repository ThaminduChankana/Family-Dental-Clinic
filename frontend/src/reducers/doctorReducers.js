import {
	DOCTOR_LOGIN_FAIL,
	DOCTOR_LOGIN_REQUEST,
	DOCTOR_LOGIN_SUCCESS,
	DOCTOR_LOGOUT,
	DOCTOR_REGISTER_FAIL,
	DOCTOR_REGISTER_REQUEST,
	DOCTOR_REGISTER_SUCCESS,
	DOCTOR_VIEW_FAIL,
	DOCTOR_VIEW_REQUEST,
	DOCTOR_VIEW_SUCCESS,
	DOCTOR_UPDATE_FAIL,
	DOCTOR_UPDATE_REQUEST,
	DOCTOR_UPDATE_SUCCESS,
	DOCTOR_DELETE_FAIL,
	DOCTOR_DELETE_REQUEST,
	DOCTOR_DELETE_SUCCESS,
	DOCTOR_LIST_FAIL,
	DOCTOR_LIST_REQUEST,
	DOCTOR_LIST_SUCCESS,
	DOCTOR_VIEW_BY_ID_FAIL,
	DOCTOR_VIEW_BY_ID_REQUEST,
	DOCTOR_VIEW_BY_ID_SUCCESS,
	DOCTOR_UPDATE_BY_ID_REQUEST,
	DOCTOR_UPDATE_BY_ID_SUCCESS,
	DOCTOR_UPDATE_BY_ID_FAIL,
} from "../constants/doctorConstants";

export const doctorLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_LOGIN_REQUEST:
			return { loading: true };
		case DOCTOR_LOGIN_SUCCESS:
			return { loading: false, doctorInfo: action.payload };
		case DOCTOR_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case DOCTOR_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const doctorRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_REGISTER_REQUEST:
			return { loading: true };
		case DOCTOR_REGISTER_SUCCESS:
			return { loading: false, doctorInfo: action.payload };
		case DOCTOR_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const doctorViewReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_VIEW_REQUEST:
			return { loading: true };
		case DOCTOR_VIEW_SUCCESS:
			return { loading: false, doctorInfo: action.payload };
		case DOCTOR_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const doctorUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_UPDATE_REQUEST:
			return { loading: true };
		case DOCTOR_UPDATE_SUCCESS:
			return { loading: false, doctorInfo: action.payload, success: true };
		case DOCTOR_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const doctorDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_DELETE_REQUEST:
			return { loading: true };
		case DOCTOR_DELETE_SUCCESS:
			return { loading: false, doctorInfo: action.payload, success: true };
		case DOCTOR_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const doctorListReducer = (state = { doctors: [] }, action) => {
	switch (action.type) {
		case DOCTOR_LIST_REQUEST:
			return { loading: true };
		case DOCTOR_LIST_SUCCESS:
			return { loading: false, doctors: action.payload };
		case DOCTOR_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const doctorViewByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_VIEW_BY_ID_REQUEST:
			return { loading: true };
		case DOCTOR_VIEW_BY_ID_SUCCESS:
			return { loading: false, doctorInfo: action.payload, success: true };
		case DOCTOR_VIEW_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};

export const doctorUpdateByIdReducer = (state = {}, action) => {
	switch (action.type) {
		case DOCTOR_UPDATE_BY_ID_REQUEST:
			return { loading: true };
		case DOCTOR_UPDATE_BY_ID_SUCCESS:
			return { loading: false, doctorInfo: action.payload, success: true };
		case DOCTOR_UPDATE_BY_ID_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
