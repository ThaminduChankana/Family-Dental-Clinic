import {
	COMMONQUESTION_GET_FAIL,
	COMMONQUESTION_GET_REQUEST,
	COMMONQUESTION_GET_SUCCESS,
	QUESTION_CREATE_FAIL,
	QUESTION_CREATE_REQUEST,
	QUESTION_CREATE_SUCCESS,
	QUESTION_DELETEFORADMIN_FAIL,
	QUESTION_DELETEFORADMIN_REQUEST,
	QUESTION_DELETEFORADMIN_SUCCESS,
	QUESTION_DELETE_FAIL,
	QUESTION_DELETE_REQUEST,
	QUESTION_DELETE_SUCCESS,
	QUESTION_GETFORADMIN_FAIL,
	QUESTION_GETFORADMIN_REQUEST,
	QUESTION_GETFORADMIN_SUCCESS,
	QUESTION_GET_FAIL,
	QUESTION_GET_REQUEST,
	QUESTION_GET_SUCCESS,
	QUESTION_UPDATEFORADMIN_FAIL,
	QUESTION_UPDATEFORADMIN_REQUEST,
	QUESTION_UPDATEFORADMIN_SUCCESS,
	QUESTION_UPDATE_FAIL,
	QUESTION_UPDATE_REQUEST,
	QUESTION_UPDATE_SUCCESS,
} from "../constants/questionConstanta";

export const getQuestionReducer = (state = { questions: [] }, action) => {
	switch (action.type) {
		case QUESTION_GET_REQUEST:
			return { loading: true };
		case QUESTION_GET_SUCCESS:
			return { loading: false, questions: action.payload };
		case QUESTION_GET_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const getQuestionCommonQAPageReducer = (state = { questions: [] }, action) => {
	switch (action.type) {
		case COMMONQUESTION_GET_REQUEST:
			return { loading: true };
		case COMMONQUESTION_GET_SUCCESS:
			return { loading: false, questions: action.payload };
		case COMMONQUESTION_GET_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const createQuestionReducer = (state = {}, action) => {
	switch (action.type) {
		case QUESTION_CREATE_REQUEST:
			return { loading: true };
		case QUESTION_CREATE_SUCCESS:
			return { loading: false, success: true };
		case QUESTION_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const updateQuestionReducer = (state = {}, action) => {
	switch (action.type) {
		case QUESTION_UPDATE_REQUEST:
			return { loading: true };
		case QUESTION_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case QUESTION_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const deleteQuestionReducer = (state = {}, action) => {
	switch (action.type) {
		case QUESTION_DELETE_REQUEST:
			return { loading: true };
		case QUESTION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case QUESTION_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const getQuestionForAdminReducer = (state = { questions: [] }, action) => {
	switch (action.type) {
		case QUESTION_GETFORADMIN_REQUEST:
			return { loading: true };
		case QUESTION_GETFORADMIN_SUCCESS:
			return { loading: false, questions: action.payload };
		case QUESTION_GETFORADMIN_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const UpdateQuestionforAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case QUESTION_UPDATEFORADMIN_REQUEST:
			return { loading: true };
		case QUESTION_UPDATEFORADMIN_SUCCESS:
			return { loading: false, success: true };
		case QUESTION_UPDATEFORADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const deleteQuestionforAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case QUESTION_DELETEFORADMIN_REQUEST:
			return { loading: true };
		case QUESTION_DELETEFORADMIN_SUCCESS:
			return { loading: false, success: true };
		case QUESTION_DELETEFORADMIN_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
