import {
	PATIENT_LOGIN_FAIL,
	PATIENT_LOGIN_REQUEST,
	PATIENT_LOGIN_SUCCESS,
	PATIENT_LOGOUT,
	PATIENT_REGISTER_FAIL,
	PATIENT_REGISTER_REQUEST,
	PATIENT_REGISTER_SUCCESS,
	PATIENT_VIEW_FAIL,
	PATIENT_VIEW_REQUEST,
	PATIENT_VIEW_SUCCESS,
	PATIENT_UPDATE_FAIL,
	PATIENT_UPDATE_REQUEST,
	PATIENT_UPDATE_SUCCESS,
	PATIENT_DELETE_FAIL,
	PATIENT_DELETE_REQUEST,
	PATIENT_DELETE_SUCCESS,
	PATIENT_LIST_FAIL,
	PATIENT_LIST_REQUEST,
	PATIENT_LIST_SUCCESS,
	PATIENT_LIST_FOR_DOCTOR_FAIL,
	PATIENT_LIST_FOR_DOCTOR_REQUEST,
	PATIENT_LIST_FOR_DOCTOR_SUCCESS,
	PATIENT_VIEW_BY_ID_FAIL,
	PATIENT_VIEW_BY_ID_REQUEST,
	PATIENT_VIEW_BY_ID_SUCCESS,
	PATIENT_UPDATE_BY_ID_FAIL,
	PATIENT_UPDATE_BY_ID_REQUEST,
	PATIENT_UPDATE_BY_ID_SUCCESS,
} from "../constants/patientConstants";
import axios from "axios";
import swal from "sweetalert";

export const patientLogin = (nic, password) => async (dispatch) => {
	try {
		dispatch({ type: PATIENT_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post("/user/patient/login", { nic, password, isAdmin: false }, config);

		dispatch({ type: PATIENT_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Patient Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/patient";
		}, 2000);
		localStorage.setItem("patientInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: PATIENT_LOGIN_FAIL,
			payload: "Invalid NIC Or Password",
		});
	}
};

export function authHeader() {
	let patient = JSON.parse(localStorage.getItem("patientInfo"));

	if (patient && patient.token) {
		return { Authorization: `Bearer ${patient.token}` };
	} else {
		return {};
	}
}

export const patientLogout = () => async (dispatch) => {
	localStorage.removeItem("patientInfo");
	dispatch({ type: PATIENT_LOGOUT });
};

export const patientRegister =
	(name, dob, gender, nic, telephone, address, email, password, pic, referringDoctor, dataEntry, regDate) =>
	async (dispatch) => {
		try {
			dispatch({ type: PATIENT_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				`/user/patient/register`,
				{
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					password,
					pic,
					referringDoctor,
					dataEntry,
					regDate,
				},
				config
			);

			dispatch({ type: PATIENT_REGISTER_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Patient Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-patients";
			}, 2000);

			dispatch({ type: PATIENT_LOGIN_SUCCESS, payload: data });
		} catch (error) {
			dispatch({
				type: PATIENT_REGISTER_FAIL,
				payload: "Patient Registration Failed !!!",
			});
		}
	};

export const patientViewProfile = (patient) => async (dispatch, getState) => {
	try {
		dispatch({ type: PATIENT_VIEW_REQUEST });

		const {
			patient_Login: { patientInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${patientInfo.token}`,
			},
		};

		const { data } = await axios.get("/user/patient/view", patient, config);

		dispatch({ type: PATIENT_VIEW_SUCCESS, payload: data });

		dispatch({ type: PATIENT_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("patientInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: PATIENT_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const patientUpdateProfile = (patient) => async (dispatch, getState) => {
	try {
		dispatch({ type: PATIENT_UPDATE_REQUEST });

		const {
			patient_Login: { patientInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${patientInfo.token}`,
			},
		};

		const { data } = await axios.put("/user/patient/edit", patient, config);

		dispatch({ type: PATIENT_UPDATE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Patient Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/patient-view";
		}, 2000);
		dispatch({ type: PATIENT_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("patientInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: PATIENT_UPDATE_FAIL,
			payload: "Patient Update Failed !!!",
		});
	}
};

export const patientsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PATIENT_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/patients`, config);

		dispatch({
			type: PATIENT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: PATIENT_LIST_FAIL,
			payload: message,
		});
	}
};

export const patientsListForDoctor = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PATIENT_LIST_FOR_DOCTOR_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/doctor/patients`, config);

		dispatch({
			type: PATIENT_LIST_FOR_DOCTOR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: PATIENT_LIST_FOR_DOCTOR_FAIL,
			payload: message,
		});
	}
};
export const patientDeleteProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PATIENT_DELETE_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/admin/patient/profile/view/${id}`, config);

		dispatch({
			type: PATIENT_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Patient Delete Failed !!!";
		dispatch({
			type: PATIENT_DELETE_FAIL,
			payload: message,
		});
	}
};

export const patientViewProfileById =
	(
		id,
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		referringDoctor,
		dataEntry,
		password,
		message,
		pic,
		regDate
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: PATIENT_VIEW_BY_ID_REQUEST,
			});

			const {
				admin_Login: { adminInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${adminInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`/user/admin/patient/profile/view/${id}`,
				{
					id,
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					referringDoctor,
					dataEntry,
					password,
					message,
					pic,
					regDate,
				},
				config
			);

			dispatch({
				type: PATIENT_VIEW_BY_ID_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: PATIENT_VIEW_BY_ID_FAIL,
				payload: message,
			});
		}
	};
export const patientUpdateProfileById =
	(
		id,
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		referringDoctor,
		dataEntry,
		password,
		message,
		pic,
		regDate
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: PATIENT_UPDATE_BY_ID_REQUEST,
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
			const { data } = await axios.put(
				`/user/admin/patient/profile/edit/${id}`,
				{
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					referringDoctor,
					dataEntry,
					password,
					message,
					pic,
					regDate,
				},
				config
			);

			dispatch({
				type: PATIENT_UPDATE_BY_ID_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Patient Account Update Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-patients";
			}, 2000);
		} catch (error) {
			const message = "Patient Update Failed !!!";
			dispatch({
				type: PATIENT_UPDATE_BY_ID_FAIL,
				payload: message,
			});
		}
	};
