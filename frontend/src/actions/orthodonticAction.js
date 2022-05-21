import {
	ORTHODONTIC_LIST_REQUEST,
	ORTHODONTIC_LIST_SUCCESS,
	ORTHODONTIC_LIST_FAIL,
	ORTHODONTIC_CREATE_REQUEST,
	ORTHODONTIC_CREATE_SUCCESS,
	ORTHODONTIC_CREATE_FAIL,
	ORTHODONTIC_UPDATE_REQUEST,
	ORTHODONTIC_UPDATE_SUCCESS,
	ORTHODONTIC_UPDATE_FAIL,
	ORTHODONTIC_DELETE_REQUEST,
	ORTHODONTIC_DELETE_SUCCESS,
	ORTHODONTIC_DELETE_FAIL,
} from "../constants/orthodonticConstants";
import axios from "axios";
import swal from "sweetalert";

export const listOrthodontics = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORTHODONTIC_LIST_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/doctor/treatment/orthodontic/get`, config);

		dispatch({
			type: ORTHODONTIC_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ORTHODONTIC_LIST_FAIL,
			payload: message,
		});
	}
};

export const createOrthodonticAction =
	(nic, firstVisit, fullCost, paid, facialExamination, followUpVisits, remark) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORTHODONTIC_CREATE_REQUEST,
			});

			const {
				doctor_Login: { doctorInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${doctorInfo.token}`,
				},
			};
			const { data } = await axios.post(
				`/user/doctor/treatment/orthodontic/create`,
				{
					nic,
					firstVisit,
					fullCost,
					paid,
					facialExamination,
					followUpVisits,
					remark,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Orthodontic successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/treatment-orthodontic-view";
			}, 2000);

			dispatch({
				type: ORTHODONTIC_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ORTHODONTIC_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateOrthodonticAction =
	(id, nic, fullCost, paid, firstVisit, facialExamination, followUpVisits, remark) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORTHODONTIC_UPDATE_REQUEST,
			});

			const {
				doctor_Login: { doctorInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${doctorInfo.token}`,
				},
			};

			const { data } = await axios.put(
				`/user/doctor/treatment/orthodontic/get/${id}`,
				{
					nic,
					fullCost,
					paid,
					firstVisit,
					facialExamination,
					followUpVisits,
					remark,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Orthodontic successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/treatment-orthodontic-view";
			}, 2000);

			dispatch({
				type: ORTHODONTIC_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: ORTHODONTIC_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteOrthodonticAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORTHODONTIC_DELETE_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/doctor/treatment/orthodontic/get/${id}`, config);

		dispatch({
			type: ORTHODONTIC_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: ORTHODONTIC_DELETE_FAIL,
			payload: message,
		});
	}
};
