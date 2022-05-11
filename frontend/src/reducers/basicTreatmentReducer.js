import {
	BASICTREATMENT_LIST_FAIL,
	BASICTREATMENT_LIST_REQUEST,
	BASICTREATMENT_LIST_SUCCESS,
	BASICTREATMENT_CREATE_FAIL,
	BASICTREATMENT_CREATE_REQUEST,
	BASICTREATMENT_CREATE_SUCCESS,
	BASICTREATMENT_UPDATE_REQUEST,
	BASICTREATMENT_UPDATE_SUCCESS,
	BASICTREATMENT_UPDATE_FAIL,
	BASICTREATMENT_DELETE_FAIL,
	BASICTREATMENT_DELETE_REQUEST,
	BASICTREATMENT_DELETE_SUCCESS,
} from "../constants/basicTreatmentConstants";

export const basicTreatmentListReducer = (state = { basicTreatments: [] }, action) => {
	switch (action.type) {
		case BASICTREATMENT_LIST_REQUEST:
			return { loading: true };
		case BASICTREATMENT_LIST_SUCCESS:
			return { loading: false, basicTreatments: action.payload };
		case BASICTREATMENT_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const basicTreatmentCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case BASICTREATMENT_CREATE_REQUEST:
			return { loading: true };
		case BASICTREATMENT_CREATE_SUCCESS:
			return { loading: false, success: true };
		case BASICTREATMENT_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const basicTreatmentUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case BASICTREATMENT_UPDATE_REQUEST:
			return { loading: true };
		case BASICTREATMENT_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case BASICTREATMENT_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const basicTreatmentDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case BASICTREATMENT_DELETE_REQUEST:
			return { loading: true };
		case BASICTREATMENT_DELETE_SUCCESS:
			return { loading: false, success: true };
		case BASICTREATMENT_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
