import {
	SCHEDULE_LIST_REQUEST,
	SCHEDULE_LIST_SUCCESS,
	SCHEDULE_LIST_FAIL,
	SCHEDULE_CREATE_REQUEST,
	SCHEDULE_CREATE_SUCCESS,
	SCHEDULE_CREATE_FAIL,
	SCHEDULE_UPDATE_REQUEST,
	SCHEDULE_UPDATE_SUCCESS,
	SCHEDULE_UPDATE_FAIL,
	SCHEDULE_DELETE_REQUEST,
	SCHEDULE_DELETE_SUCCESS,
	SCHEDULE_DELETE_FAIL,
	COMMON_SCHEDULE_LIST_FAIL,
	COMMON_SCHEDULE_LIST_SUCCESS,
	COMMON_SCHEDULE_LIST_REQUEST,
} from "../constants/scheduleHandlingConstants";

export const ScheduleHandlingListReducer = (state = { schedules: [] }, action) => {
	switch (action.type) {
		case SCHEDULE_LIST_REQUEST:
			return { loading: true };
		case SCHEDULE_LIST_SUCCESS:
			return { loading: false, schedules: action.payload };
		case SCHEDULE_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const ScheduleHandlingCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SCHEDULE_CREATE_REQUEST:
			return { loading: true };
		case SCHEDULE_CREATE_SUCCESS:
			return { loading: false, success: true };
		case SCHEDULE_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const ScheduleHandlingUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case SCHEDULE_UPDATE_REQUEST:
			return { loading: true };
		case SCHEDULE_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case SCHEDULE_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const ScheduleHandlingDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case SCHEDULE_DELETE_REQUEST:
			return { loading: true };
		case SCHEDULE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case SCHEDULE_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
export const ScheduleListForUsersReducer = (state = { schedules: [] }, action) => {
	switch (action.type) {
		case COMMON_SCHEDULE_LIST_REQUEST:
			return { loading: true };
		case COMMON_SCHEDULE_LIST_SUCCESS:
			return { loading: false, schedules: action.payload };
		case COMMON_SCHEDULE_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
