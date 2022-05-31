import {
	DOCTOR_LOGIN_FAIL,
	DOCTOR_LOGIN_REQUEST,
	DOCTOR_LOGIN_SUCCESS,
	DOCTOR_LOGOUT,
	DOCTOR_REGISTER_FAIL,
	DOCTOR_REGISTER_REQUEST,
	DOCTOR_REGISTER_SUCCESS,
	DOCTOR_VIEW_FAIL,
	DOCTOR_VIEW_REQUEST,
	DOCTOR_VIEW_SUCCESS,
	DOCTOR_UPDATE_FAIL,
	DOCTOR_UPDATE_REQUEST,
	DOCTOR_UPDATE_SUCCESS,
	DOCTOR_DELETE_FAIL,
	DOCTOR_DELETE_REQUEST,
	DOCTOR_DELETE_SUCCESS,
	DOCTOR_LIST_FAIL,
	DOCTOR_LIST_REQUEST,
	DOCTOR_LIST_SUCCESS,
	DOCTOR_VIEW_BY_ID_FAIL,
	DOCTOR_VIEW_BY_ID_REQUEST,
	DOCTOR_VIEW_BY_ID_SUCCESS,
	DOCTOR_UPDATE_BY_ID_FAIL,
	DOCTOR_UPDATE_BY_ID_REQUEST,
	DOCTOR_UPDATE_BY_ID_SUCCESS,
} from "../constants/doctorConstants";
import axios from "axios";
import swal from "sweetalert";

export const doctorLogin = (nic, password) => async (dispatch) => {
	try {
		dispatch({ type: DOCTOR_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post("/user/doctor/login", { nic, password, isAdmin: false }, config);

		dispatch({ type: DOCTOR_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Doctor Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/doctor";
		}, 2000);
		localStorage.setItem("doctorInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: DOCTOR_LOGIN_FAIL,
			payload: "Invalid NIC Or Password !!!",
		});
	}
};

export function authHeader() {
	let doctor = JSON.parse(localStorage.getItem("doctorInfo"));

	if (doctor && doctor.token) {
		return { Authorization: `Bearer ${doctor.token}` };
	} else {
		return {};
	}
}

export const doctorLogout = () => async (dispatch) => {
	localStorage.removeItem("doctorInfo");
	dispatch({ type: DOCTOR_LOGOUT });
};

export const doctorRegister =
	(
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		sldaReg,
		licenceNo,
		currentHospital,
		password,
		pic,
		dataEntry,
		regDate
	) =>
	async (dispatch) => {
		try {
			dispatch({ type: DOCTOR_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				`/user/doctor/register`,
				{
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					sldaReg,
					licenceNo,
					currentHospital,
					password,
					pic,
					dataEntry,
					regDate,
				},
				config
			);

			dispatch({ type: DOCTOR_REGISTER_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Doctor Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-doctors";
			}, 2000);
		} catch (error) {
			dispatch({
				type: DOCTOR_REGISTER_FAIL,
				payload: "Doctor Registration Failed !!!",
			});
		}
	};

export const doctorViewProfile = (doctor) => async (dispatch, getState) => {
	try {
		dispatch({ type: DOCTOR_VIEW_REQUEST });

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.get("/user/doctor/view", doctor, config);

		dispatch({ type: DOCTOR_VIEW_SUCCESS, payload: data });

		dispatch({ type: DOCTOR_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("doctorInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: DOCTOR_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const doctorUpdateProfile = (doctor) => async (dispatch, getState) => {
	try {
		dispatch({ type: DOCTOR_UPDATE_REQUEST });

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.put("/user/doctor/edit", doctor, config);

		dispatch({ type: DOCTOR_UPDATE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Doctor Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/doctor-view";
		}, 2000);
		dispatch({ type: DOCTOR_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("doctorInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: DOCTOR_UPDATE_FAIL,
			payload: "Doctor Update Failed !!!",
		});
	}
};

export const doctorsList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DOCTOR_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/doctors`, config);

		dispatch({
			type: DOCTOR_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: DOCTOR_LIST_FAIL,
			payload: message,
		});
	}
};

export const doctorDeleteProfile = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DOCTOR_DELETE_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/admin/doctor/profile/view/${id}`, config);

		dispatch({
			type: DOCTOR_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = "Doctor Delete Failed !!!";
		dispatch({
			type: DOCTOR_DELETE_FAIL,
			payload: message,
		});
	}
};

export const doctorViewProfileById =
	(
		id,
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		sldaReg,
		licenceNo,
		currentHospital,
		dataEntry,
		password,
		message,
		pic,
		regDate
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: DOCTOR_VIEW_BY_ID_REQUEST,
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
			const { data } = await axios.get(
				`/user/admin/doctor/profile/view/${id}`,
				{
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					sldaReg,
					licenceNo,
					currentHospital,
					dataEntry,
					password,
					message,
					pic,
					regDate,
				},
				config
			);

			dispatch({
				type: DOCTOR_VIEW_BY_ID_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: DOCTOR_VIEW_BY_ID_FAIL,
				payload: message,
			});
		}
	};

export const doctorUpdateProfileById =
	(
		id,
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		sldaReg,
		licenceNo,
		currentHospital,
		dataEntry,
		password,
		message,
		pic,
		regDate
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: DOCTOR_UPDATE_BY_ID_REQUEST,
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
				`/user/admin/doctor/profile/edit/${id}`,
				{
					name,
					dob,
					gender,
					nic,
					telephone,
					address,
					email,
					sldaReg,
					licenceNo,
					currentHospital,
					dataEntry,
					password,
					message,
					pic,
					regDate,
				},
				config
			);

			dispatch({
				type: DOCTOR_UPDATE_BY_ID_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Doctor Account Update Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});
			setTimeout(function () {
				window.location.href = "/admin-doctors";
			}, 2000);
		} catch (error) {
			const message = "Doctor Update Failed !!!";
			dispatch({
				type: DOCTOR_UPDATE_BY_ID_FAIL,
				payload: message,
			});
		}
	};
