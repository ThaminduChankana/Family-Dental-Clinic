import {
	ADMIN_LOGIN_FAIL,
	ADMIN_LOGIN_REQUEST,
	ADMIN_LOGIN_SUCCESS,
	ADMIN_LOGOUT,
	ADMIN_REGISTER_FAIL,
	ADMIN_REGISTER_REQUEST,
	ADMIN_REGISTER_SUCCESS,
	ADMIN_VIEW_FAIL,
	ADMIN_VIEW_REQUEST,
	ADMIN_VIEW_SUCCESS,
	ADMIN_UPDATE_FAIL,
	ADMIN_UPDATE_REQUEST,
	ADMIN_UPDATE_SUCCESS,
} from "../constants/adminConstants";
import axios from "axios";
import swal from "sweetalert";

export const adminLogin = (nic, password) => async (dispatch) => {
	try {
		dispatch({ type: ADMIN_LOGIN_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

		const { data } = await axios.post("/user/admin/login", { nic, password, isAdmin: true }, config);

		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Admin Log In Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		setTimeout(function () {
			window.location.href = "/admin";
		}, 2000);
		localStorage.setItem("adminInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_LOGIN_FAIL,
			payload: "Invalid NIC Or Password !!!",
		});
	}
};

export function authHeader() {
	let admin = JSON.parse(localStorage.getItem("adminInfo"));

	if (admin && admin.token) {
		return { Authorization: `Bearer ${admin.token}` };
	} else {
		return {};
	}
}

export const adminLogout = () => async (dispatch) => {
	localStorage.removeItem("adminInfo");
	dispatch({ type: ADMIN_LOGOUT });
};

export const adminRegister =
	(name, dob, nic, telephone, address, email, previousRef, password, pic, dataEntry) => async (dispatch) => {
		try {
			dispatch({ type: ADMIN_REGISTER_REQUEST });

			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			const { data } = await axios.post(
				`/user/admin/register`,
				{
					name,
					dob,
					nic,
					telephone,
					email,
					address,
					previousRef,
					password,
					pic,
					dataEntry,
				},
				config
			);

			dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
			swal({
				title: "Success !!!",
				text: "Admin Registration Successful.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			setTimeout(function () {
				window.location.href = "/admin";
			}, 2000);

			dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

			localStorage.setItem("adminRegInfo", JSON.stringify(data));
		} catch (error) {
			dispatch({
				type: ADMIN_REGISTER_FAIL,
				payload: "Admin Registration Failed !!!",
			});
		}
	};

export const adminViewProfile = (admin) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADMIN_VIEW_REQUEST });

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get("/user/admin/view", admin, config);

		dispatch({ type: ADMIN_VIEW_SUCCESS, payload: data });

		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

		localStorage.setItem("adminInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

export const adminUpdateProfile = (admin) => async (dispatch, getState) => {
	try {
		dispatch({ type: ADMIN_UPDATE_REQUEST });

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.put("/user/admin/edit", admin, config);

		dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data });
		swal({
			title: "Success !!!",
			text: "Admin Account Update Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});
		dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
		setTimeout(function () {
			window.location.href = "/admin-view";
		}, 2000);
		localStorage.setItem("adminInfo", JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: ADMIN_UPDATE_FAIL,
			payload: "Admin Update Failed !!!",
		});
	}
};
