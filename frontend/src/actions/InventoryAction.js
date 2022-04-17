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

export const listInventory = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: INVENTORY_LIST_REQUEST,
		});

		/*const {
            userLogin: {userInfo},
        } = getState();

        const config = {
            headers: {
            Authorization: 'Bearer ${userInfo.token}' ,
            },
        };*/

		//Remove config
		const { data } = await axios.get("http://localhost:5000/user/admin/inventory/get");

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

		/* const {
                userLogin: {userInfo},
            } = getState();

            const config = {
                headers: {
                 "Content-Type": "application/json",
                  Authorization: 'Bearer ${userInfo.token}',
                },
               
            }; */

		//Remove config
		const { data } = await axios.post("http://localhost:5000/user/admin/inventory/create", {
			productName,
			quantity,
			description,
		});

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

export const updateInventoryAction = (productName, quantity, description) => async (dispatch, getState) => {
	try {
		dispatch({
			type: INVENTORY_UPDATE_REQUEST,
		});

		/*const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ${userInfo.token}',
                },
            };*/

		const { data } = await axios.put("http://localhost:5000/user/admin/inventory/get/${id}", {
			productName,
			quantity,
			description,
		});

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

		/* const {
             userLogin: { userInfo },
         } = getState();
 
         const config = {
             headers: {
                 Authorization: 'Bearer ${userInfo.token}',
             },
         };*/

		const { data } = await axios.delete("http://localhost:5000/user/admin/inventory/get/${id}");

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
