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

export const listBasicTreatments = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: BASICTREATMENT_LIST_REQUEST,
		});

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		// Remove the config
		const { data } = await axios.get(`http://localhost:5000/user/doctor/treatment/basic_treatment/get`);

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

			// const {
			// 	userLogin: { userInfo },
			// } = getState();

			// const config = {
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: `Bearer ${userInfo.token}`,
			// 	},
			// };

			// Remove the config
			const { data } = await axios.post(`http://localhost:5000/user/doctor/treatment/basic_treatment/create`, {
				nic,
				cost,
				treatmentType,
				date,
				checkup,
				procedure,
				remark,
			});

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

			// const {
			// 	userLogin: { userInfo },
			// } = getState();

			// const config = {
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: `Bearer ${userInfo.token}`,
			// 	},
			// };

			const { data } = await axios.put(`http://localhost:5000/user/doctor/treatment/basic_treatment/get/${id}`, {
				nic,
				cost,
				treatmentType,
				date,
				checkup,
				procedure,
				remark,
			});

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

		// const {
		// 	userLogin: { userInfo },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		Authorization: `Bearer ${userInfo.token}`,
		// 	},
		// };

		const { data } = await axios.delete(`http://localhost:5000/user/doctor/treatment/basic_treatment/get/${id}`);

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
