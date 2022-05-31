import {
	INVENTORY_LIST_REQUEST,
	INVENTORY_LIST_SUCCESS,
	INVENTORY_LIST_FAIL,
	INVENTORY_CREATE_REQUEST,
	INVENTORY_CREATE_SUCCESS,
	INVENTORY_CREATE_FAIL,
	INVENTORY_UPDATE_REQUEST,
	INVENTORY_UPDATE_SUCCESS,
	INVENTORY_UPDATE_FAIL,
	INVENTORY_DELETE_REQUEST,
	INVENTORY_DELETE_SUCCESS,
	INVENTORY_DELETE_FAIL,
} from "../constants/InventoryConstants";
import axios from "axios";
import swal from "sweetalert";

export const listInventory = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: INVENTORY_LIST_REQUEST,
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

		const { data } = await axios.get(`/user/admin/inventory/get`, config);

		dispatch({
			type: INVENTORY_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: INVENTORY_LIST_FAIL,
			payload: message,
		});
	}
};

export const createInventoryAction = (productName, quantity, description) => async (dispatch, getState) => {
	try {
		dispatch({
			type: INVENTORY_CREATE_REQUEST,
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

		const { data } = await axios.post(
			`/user/admin/inventory/create`,
			{
				productName,
				quantity,
				description,
			},
			config
		);
		swal({
			title: "Success !!!",
			text: "Inventory successfully created.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/inventory-view";
		}, 2000);
		dispatch({
			type: INVENTORY_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: INVENTORY_CREATE_FAIL,
			payload: message,
		});
	}
};

export const updateInventoryAction = (id, productName, quantity, description) => async (dispatch, getState) => {
	try {
		dispatch({
			type: INVENTORY_UPDATE_REQUEST,
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
			`/user/admin/inventory/get/${id}`,
			{
				productName,
				quantity,
				description,
			},
			config
		);
		swal({
			title: "Success !!!",
			text: "Inventory successfully updated.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/inventory-view";
		}, 2000);
		dispatch({
			type: INVENTORY_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: INVENTORY_UPDATE_FAIL,
			payload: message,
		});
	}
};

export const deleteInventoryAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: INVENTORY_DELETE_REQUEST,
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

		const { data } = await axios.delete(`/user/admin/inventory/get/${id}`, config);

		dispatch({
			type: INVENTORY_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: INVENTORY_DELETE_FAIL,
			payload: message,
		});
	}
};
