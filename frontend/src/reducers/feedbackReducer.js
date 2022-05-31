import {
	COMMONFEEDBACK_GET_FAIL,
	COMMONFEEDBACK_GET_REQUEST,
	COMMONFEEDBACK_GET_SUCCESS,
	FEEDBACK_CREATE_FAIL,
	FEEDBACK_CREATE_REQUEST,
	FEEDBACK_CREATE_SUCCESS,
	FEEDBACK_DELETEFORADMIN_FAIL,
	FEEDBACK_DELETEFORADMIN_REQUEST,
	FEEDBACK_DELETEFORADMIN_SUCCESS,
	FEEDBACK_DELETE_FAIL,
	FEEDBACK_DELETE_REQUEST,
	FEEDBACK_DELETE_SUCCESS,
	FEEDBACK_GETFORADMIN_FAIL,
	FEEDBACK_GETFORADMIN_REQUEST,
	FEEDBACK_GETFORADMIN_SUCCESS,
	FEEDBACK_GET_FAIL,
	FEEDBACK_GET_REQUEST,
	FEEDBACK_GET_SUCCESS,
	FEEDBACK_UPDATEFORADMIN_FAIL,
	FEEDBACK_UPDATEFORADMIN_REQUEST,
	FEEDBACK_UPDATEFORADMIN_SUCCESS,
	FEEDBACK_UPDATE_FAIL,
	FEEDBACK_UPDATE_REQUEST,
	FEEDBACK_UPDATE_SUCCESS,
} from "../constants/feedbackConstantnts";

export const getFeedbackReducer = (state = { feedbacks: [] }, action) => {
	switch (action.type) {
		case FEEDBACK_GET_REQUEST:
			return { loading: true };
		case FEEDBACK_GET_SUCCESS:
			return { loading: false, feedbacks: action.payload };
		case FEEDBACK_GET_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const getFeedbackCommonReviewPageReducer = (state = { feedbacks: [] }, action) => {
	switch (action.type) {
		case COMMONFEEDBACK_GET_REQUEST:
			return { loading: true };
		case COMMONFEEDBACK_GET_SUCCESS:
			return { loading: false, feedbacks: action.payload };
		case COMMONFEEDBACK_GET_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const createFeedbackReducer = (state = {}, action) => {
	switch (action.type) {
		case FEEDBACK_CREATE_REQUEST:
			return { loading: true };
		case FEEDBACK_CREATE_SUCCESS:
			return { loading: false, success: true };
		case FEEDBACK_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const updateFeedbackReducer = (state = {}, action) => {
	switch (action.type) {
		case FEEDBACK_UPDATE_REQUEST:
			return { loading: true };
		case FEEDBACK_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case FEEDBACK_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const deleteFeedbackReducer = (state = {}, action) => {
	switch (action.type) {
		case FEEDBACK_DELETE_REQUEST:
			return { loading: true };
		case FEEDBACK_DELETE_SUCCESS:
			return { loading: false, success: true };
		case FEEDBACK_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const getFeedbackforAdminReducer = (state = { feedbacks: [] }, action) => {
	switch (action.type) {
		case FEEDBACK_GETFORADMIN_REQUEST:
			return { loading: true };
		case FEEDBACK_GETFORADMIN_SUCCESS:
			return { loading: false, feedbacks: action.payload };
		case FEEDBACK_GETFORADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const UpdateFeedbackforAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case FEEDBACK_UPDATEFORADMIN_REQUEST:
			return { loading: true };
		case FEEDBACK_UPDATEFORADMIN_SUCCESS:
			return { loading: false, success: true };
		case FEEDBACK_UPDATEFORADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const deleteFeedbackforAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case FEEDBACK_DELETEFORADMIN_REQUEST:
			return { loading: true };
		case FEEDBACK_DELETEFORADMIN_SUCCESS:
			return { loading: false, success: true };
		case FEEDBACK_DELETEFORADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
