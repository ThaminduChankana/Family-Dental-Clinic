import axios from "axios";
import {
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

export const getQuestionAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: QUESTION_GET_REQUEST,
		});

		const {
			patient_Login: { patientInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${patientInfo.token}`,
			},
		};

		const { data } = await axios.get(`http://localhost:5000/user/patient/question/view`, config);

		dispatch({
			type: QUESTION_GET_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: QUESTION_GET_FAIL,
			payload: message,
		});
	}
};

export const createQuestionAction =
	(name, email, question_type, question_description) => async (dispatch, getState) => {
		try {
			dispatch({
				type: QUESTION_CREATE_REQUEST,
			});

			const {
				patient_Login: { patientInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${patientInfo.token}`,
				},
			};

			// Remove the config
			const { data } = await axios.post(
				`http://localhost:5000/user/patient/question/create`,
				{
					name,
					email,
					question_type,
					question_description,
				},
				config
			);

			dispatch({
				type: QUESTION_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: QUESTION_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateQuestionAction =
	(id, name, email, question_type, question_description) => async (dispatch, getState) => {
		try {
			dispatch({
				type: QUESTION_UPDATE_REQUEST,
			});

			const {
				patient_Login: { patientInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${patientInfo.token}`,
				},
			};

			// eslint-disable-next-line no-undef
			const { data } = await axios.put(
				`http://localhost:5000/user/patient/question/update/${id}`,
				{
					id,
					name,
					email,
					question_type,
					question_description,
				},
				config
			);

			dispatch({
				type: QUESTION_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: QUESTION_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteQuestionAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: QUESTION_DELETE_REQUEST,
		});

		const {
			patient_Login: { patientInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${patientInfo.token}`,
			},
		};

		const { data } = await axios.delete(`http://localhost:5000/user/patient/question/delete/${id}`, config);

		dispatch({
			type: QUESTION_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: QUESTION_DELETE_FAIL,
			payload: message,
		});
	}
};

/*Admin*/

export const getQuestionForAdminAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: QUESTION_GETFORADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`http://localhost:5000/user/admin/question/view`, config);

		dispatch({
			type: QUESTION_GETFORADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: QUESTION_GETFORADMIN_FAIL,
			payload: message,
		});
	}
};

export const UpdateQuestionforAdminAction = (id, isAdmin, answer) => async (dispatch, getState) => {
	try {
		dispatch({
			type: QUESTION_UPDATEFORADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		// eslint-disable-next-line no-undef
		const { data } = await axios.put(
			`http://localhost:5000/user/admin/question/update/${id}`,
			{
				id,
				isAdmin,
				answer,
			},
			config
		);

		dispatch({
			type: QUESTION_UPDATEFORADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: QUESTION_UPDATEFORADMIN_FAIL,
			payload: message,
		});
	}
};

export const deleteQuestionforAdminAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: QUESTION_DELETEFORADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`http://localhost:5000/user/admin/question/delete/${id}`, config);

		dispatch({
			type: QUESTION_DELETEFORADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: QUESTION_DELETEFORADMIN_FAIL,
			payload: message,
		});
	}
};
