import {
	FILLING_LIST_FAIL,
	FILLING_LIST_REQUEST,
	FILLING_LIST_SUCCESS,
	FILLING_CREATE_FAIL,
	FILLING_CREATE_REQUEST,
	FILLING_CREATE_SUCCESS,
	FILLING_UPDATE_REQUEST,
	FILLING_UPDATE_SUCCESS,
	FILLING_UPDATE_FAIL,
	FILLING_DELETE_FAIL,
	FILLING_DELETE_REQUEST,
	FILLING_DELETE_SUCCESS,
} from "../constants/fillingConstants";

export const fillingListReducer = (state = { fillings: [] }, action) => {
	switch (action.type) {
		case FILLING_LIST_REQUEST:
			return { loading: true };
		case FILLING_LIST_SUCCESS:
			return { loading: false, fillings: action.payload };
		case FILLING_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const fillingCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case FILLING_CREATE_REQUEST:
			return { loading: true };
		case FILLING_CREATE_SUCCESS:
			return { loading: false, success: true };
		case FILLING_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const fillingUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case FILLING_UPDATE_REQUEST:
			return { loading: true };
		case FILLING_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case FILLING_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const fillingDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case FILLING_DELETE_REQUEST:
			return { loading: true };
		case FILLING_DELETE_SUCCESS:
			return { loading: false, success: true };
		case FILLING_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
