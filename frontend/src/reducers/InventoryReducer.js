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

export const inventoryListReducer = (state = { inventory: [] }, action) => {
	switch (action.type) {
		case INVENTORY_LIST_REQUEST:
			return { loading: true };
		case INVENTORY_LIST_SUCCESS:
			return { loading: false, inventory: action.payload };
		case INVENTORY_LIST_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const inventoryCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case INVENTORY_CREATE_REQUEST:
			return { loading: true };
		case INVENTORY_CREATE_SUCCESS:
			return { loading: false, success: true };
		case INVENTORY_CREATE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const inventoryUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case INVENTORY_UPDATE_REQUEST:
			return { loading: true };
		case INVENTORY_UPDATE_SUCCESS:
			return { loading: false, success: true };
		case INVENTORY_UPDATE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const inventoryDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case INVENTORY_DELETE_REQUEST:
			return { loading: true };
		case INVENTORY_DELETE_SUCCESS:
			return { loading: false, success: true };
		case INVENTORY_DELETE_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};
