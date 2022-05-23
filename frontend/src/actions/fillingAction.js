import {
	FILLING_LIST_REQUEST,
	FILLING_LIST_SUCCESS,
	FILLING_LIST_FAIL,
	FILLING_CREATE_REQUEST,
	FILLING_CREATE_SUCCESS,
	FILLING_CREATE_FAIL,
	FILLING_UPDATE_REQUEST,
	FILLING_UPDATE_SUCCESS,
	FILLING_UPDATE_FAIL,
	FILLING_DELETE_REQUEST,
	FILLING_DELETE_SUCCESS,
	FILLING_DELETE_FAIL,
} from "../constants/fillingConstants";
import axios from "axios";
import swal from "sweetalert";

export const listFillings = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FILLING_LIST_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};
		const { data } = await axios.get(`/user/doctor/treatment/filling/get`, config);

		dispatch({
			type: FILLING_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FILLING_LIST_FAIL,
			payload: message,
		});
	}
};

export const createFillingAction =
	(nic, cost, anestheticStatus, fillingMaterial, fillingType, date, checkup, procedure, remark) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: FILLING_CREATE_REQUEST,
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
				`/user/doctor/treatment/filling/create`,
				{
					nic,
					cost,
					anestheticStatus,
					fillingMaterial,
					fillingType,
					date,
					checkup,
					procedure,
					remark,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Filling successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/treatment-filling-view";
			}, 2000);
			dispatch({
				type: FILLING_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: FILLING_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateFillingAction =
	(id, nic, cost, anestheticStatus, fillingMaterial, fillingType, date, checkup, procedure, remark) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: FILLING_UPDATE_REQUEST,
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
				`/user/doctor/treatment/filling/get/${id}`,
				{
					nic,
					cost,
					anestheticStatus,
					fillingMaterial,
					fillingType,
					date,
					checkup,
					procedure,
					remark,
				},
				config
			);
			swal({
				title: "Success !!!",
				text: "Filling successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/treatment-filling-view";
			}, 2000);

			dispatch({
				type: FILLING_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: FILLING_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteFillingAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FILLING_DELETE_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/doctor/treatment/filling/get/${id}`, config);

		dispatch({
			type: FILLING_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FILLING_DELETE_FAIL,
			payload: message,
		});
	}
};
