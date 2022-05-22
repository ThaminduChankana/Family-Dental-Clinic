import {
	BASICTREATMENT_LIST_REQUEST,
	BASICTREATMENT_LIST_SUCCESS,
	BASICTREATMENT_LIST_FAIL,
	BASICTREATMENT_CREATE_REQUEST,
	BASICTREATMENT_CREATE_SUCCESS,
	BASICTREATMENT_CREATE_FAIL,
	BASICTREATMENT_UPDATE_REQUEST,
	BASICTREATMENT_UPDATE_SUCCESS,
	BASICTREATMENT_UPDATE_FAIL,
	BASICTREATMENT_DELETE_REQUEST,
	BASICTREATMENT_DELETE_SUCCESS,
	BASICTREATMENT_DELETE_FAIL,
} from "../constants/basicTreatmentConstants";
import axios from "axios";
import swal from "sweetalert";

export const listBasicTreatments = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: BASICTREATMENT_LIST_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/doctor/treatment/basic_treatment/get`, config);

		dispatch({
			type: BASICTREATMENT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: BASICTREATMENT_LIST_FAIL,
			payload: message,
		});
	}
};

export const createBasicTreatmentAction =
	(nic, cost, treatmentType, date, checkup, procedure, remark) => async (dispatch, getState) => {
		try {
			dispatch({
				type: BASICTREATMENT_CREATE_REQUEST,
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
				`/user/doctor/treatment/basic_treatment/create`,
				{
					nic,
					cost,
					treatmentType,
					date,
					checkup,
					procedure,
					remark,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Basic Treatment successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/treatment-basicTreatment-view";
			}, 2000);
			dispatch({
				type: BASICTREATMENT_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: BASICTREATMENT_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateBasicTreatmentAction =
	(id, nic, cost, treatmentType, date, checkup, procedure, remark) => async (dispatch, getState) => {
		try {
			dispatch({
				type: BASICTREATMENT_UPDATE_REQUEST,
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
				`/user/doctor/treatment/basic_treatment/get/${id}`,
				{
					nic,
					cost,
					treatmentType,
					date,
					checkup,
					procedure,
					remark,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Basic Treatment successfully updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/treatment-basicTreatment-view";
			}, 2000);
			dispatch({
				type: BASICTREATMENT_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: BASICTREATMENT_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteBasicTreatmentAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BASICTREATMENT_DELETE_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/doctor/treatment/basic_treatment/get/${id}`, config);

		dispatch({
			type: BASICTREATMENT_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: BASICTREATMENT_DELETE_FAIL,
			payload: message,
		});
	}
};
