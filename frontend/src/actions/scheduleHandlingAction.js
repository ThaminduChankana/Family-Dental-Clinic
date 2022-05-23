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
import axios from "axios";
import swal from "sweetalert";

export const listScheduleHandling = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SCHEDULE_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/schedule/get`, config);

		dispatch({
			type: SCHEDULE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: SCHEDULE_LIST_FAIL,
			payload: message,
		});
	}
};

export const createScheduleHandlingAction =
	(nic, name, date, time, description, addedBy) => async (dispatch, getState) => {
		try {
			dispatch({
				type: SCHEDULE_CREATE_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			const { data } = await axios.post(
				`/user/admin/schedule/create`,
				{
					nic,
					name,
					date,
					time,
					description,
					addedBy,
				},
				config
			);

			dispatch({
				type: SCHEDULE_CREATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Doctor Schedule successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/schedule-Handling-View";
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: SCHEDULE_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateScheduleHandlingAction =
	(id, nic, name, date, time, description, addedBy) => async (dispatch, getState) => {
		try {
			dispatch({
				type: SCHEDULE_UPDATE_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`/user/admin/schedule/get/${id}`,
				{
					nic,
					name,
					date,
					time,
					description,
					addedBy,
				},
				config
			);

			dispatch({
				type: SCHEDULE_UPDATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Doctor Schedule successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/schedule-Handling-View";
			}, 2000);
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: SCHEDULE_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteScheduleHandlingAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SCHEDULE_DELETE_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/admin/schedule/get/${id}`, config);

		dispatch({
			type: SCHEDULE_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: SCHEDULE_DELETE_FAIL,
			payload: message,
		});
	}
};

export const listScheduleHandlingForUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: COMMON_SCHEDULE_LIST_REQUEST,
		});

		const { data } = await axios.get(`/user/schedules`);

		dispatch({
			type: COMMON_SCHEDULE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: COMMON_SCHEDULE_LIST_FAIL,
			payload: message,
		});
	}
};
