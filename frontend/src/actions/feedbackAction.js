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
import axios from "axios";
import swal from "sweetalert";

export const getFeedbackAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEEDBACK_GET_REQUEST,
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

		const { data } = await axios.get(`/user/patient/feedback/view`, config);

		dispatch({
			type: FEEDBACK_GET_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FEEDBACK_GET_FAIL,
			payload: message,
		});
	}
};

export const getFeedbackCommonReviewPageAction = () => async (dispatch) => {
	try {
		dispatch({
			type: COMMONFEEDBACK_GET_REQUEST,
		});

		const { data } = await axios.get(`/user/feedback`);

		dispatch({
			type: COMMONFEEDBACK_GET_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: COMMONFEEDBACK_GET_FAIL,
			payload: message,
		});
	}
};

export const createFeedbackAction =
	(name, patient_email, review_description, rating_count) => async (dispatch, getState) => {
		try {
			dispatch({
				type: FEEDBACK_CREATE_REQUEST,
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
				`/user/patient/feedback/create`,
				{
					name,
					patient_email,
					review_description,
					rating_count,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Feedback successfully created.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/feedback-view-patient";
			}, 2000);

			dispatch({
				type: FEEDBACK_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: FEEDBACK_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateFeedbackAction =
	(id, name, patient_email, review_description, rating_count) => async (dispatch, getState) => {
		try {
			dispatch({
				type: FEEDBACK_UPDATE_REQUEST,
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
				`/user/patient/feedback/update/${id}`,
				{
					id,
					name,
					patient_email,
					review_description,
					rating_count,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "Feedback successfully Updated.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/feedback-view-patient";
			}, 2000);

			dispatch({
				type: FEEDBACK_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: FEEDBACK_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteFeedbackAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEEDBACK_DELETE_REQUEST,
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

		const { data } = await axios.delete(`/user/patient/feedback/delete/${id}`, config);

		dispatch({
			type: FEEDBACK_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FEEDBACK_DELETE_FAIL,
			payload: message,
		});
	}
};

export const getFeedbackforAdminAction = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEEDBACK_GETFORADMIN_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/feedback/view`, config);

		dispatch({
			type: FEEDBACK_GETFORADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FEEDBACK_GETFORADMIN_FAIL,
			payload: message,
		});
	}
};

export const UpdateFeedbackforAdminAction = (id, isAdmin) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEEDBACK_UPDATEFORADMIN_REQUEST,
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
			`/user/admin/feedback/update/${id}`,
			{
				isAdmin,
			},
			config
		);

		swal({
			title: "Success !!!",
			text: "Feedback updated successfully.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/feedback-adminview";
		}, 2000);

		dispatch({
			type: FEEDBACK_UPDATEFORADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FEEDBACK_UPDATEFORADMIN_FAIL,
			payload: message,
		});
	}
};

export const deleteFeedbackforAdminAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FEEDBACK_DELETEFORADMIN_REQUEST,
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

		const { data } = await axios.delete(`/user/admin/feedback/delete/${id}`, config);

		dispatch({
			type: FEEDBACK_DELETEFORADMIN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: FEEDBACK_DELETEFORADMIN_FAIL,
			payload: message,
		});
	}
};
