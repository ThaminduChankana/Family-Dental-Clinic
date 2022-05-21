import {
	ORTHODONTIC_LIST_FAIL,
	ORTHODONTIC_LIST_REQUEST,
	ORTHODONTIC_LIST_SUCCESS,
	ORTHODONTIC_CREATE_FAIL,
	ORTHODONTIC_CREATE_REQUEST,
	ORTHODONTIC_CREATE_SUCCESS,
	ORTHODONTIC_UPDATE_REQUEST,
	ORTHODONTIC_UPDATE_SUCCESS,
	ORTHODONTIC_UPDATE_FAIL,
	ORTHODONTIC_DELETE_FAIL,
	ORTHODONTIC_DELETE_REQUEST,
	ORTHODONTIC_DELETE_SUCCESS,
} from "../constants/orthodonticConstants";

export const orthodonticListReducer = (state = { orthodontics: [] }, action) => {
	switch (action.type) {
		case ORTHODONTIC_LIST_REQUEST:
			return { loading: true };
		case ORTHODONTIC_LIST_SUCCESS:
			return { loading: false, orthodontics: action.payload };
		case ORTHODONTIC_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const orthodonticCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORTHODONTIC_CREATE_REQUEST:
			return { loading: true };
		case ORTHODONTIC_CREATE_SUCCESS:
			return { loading: false, success: true };
		case ORTHODONTIC_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const orthodonticUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORTHODONTIC_UPDATE_REQUEST:
			return { loading: true };
		case ORTHODONTIC_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case ORTHODONTIC_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const orthodonticDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ORTHODONTIC_DELETE_REQUEST:
			return { loading: true };
		case ORTHODONTIC_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ORTHODONTIC_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
