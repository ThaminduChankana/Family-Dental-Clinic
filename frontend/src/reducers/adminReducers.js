import {
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGOUT,
	ADMIN_REGISTER_FAIL,
	ADMIN_REGISTER_REQUEST,
	ADMIN_REGISTER_SUCCESS,
	ADMIN_VIEW_FAIL,
	ADMIN_VIEW_REQUEST,
	ADMIN_VIEW_SUCCESS,
	ADMIN_UPDATE_FAIL,
	ADMIN_UPDATE_REQUEST,
	ADMIN_UPDATE_SUCCESS,
} from "../constants/adminConstants";

export const adminLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_LOGIN_REQUEST:
			return { loading: true };
		case ADMIN_LOGIN_SUCCESS:
			return { loading: false, adminInfo: action.payload };
		case ADMIN_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		case ADMIN_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const adminRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_REGISTER_REQUEST:
			return { loading: true };
		case ADMIN_REGISTER_SUCCESS:
			return { loading: false, adminInfo: action.payload };
		case ADMIN_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const adminViewReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_VIEW_REQUEST:
			return { loading: true };
		case ADMIN_VIEW_SUCCESS:
			return { loading: false, adminInfo: action.payload };
		case ADMIN_VIEW_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const adminUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_UPDATE_REQUEST:
			return { loading: true };
		case ADMIN_UPDATE_SUCCESS:
			return { loading: false, adminInfo: action.payload, success: true };
		case ADMIN_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };
		default:
			return state;
	}
};
