import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extention";
import {
	inventoryListReducer,
	inventoryCreateReducer,
	inventoryUpdateReducer,
	inventoryDeleteReducer,
} from "./reducers/InventoryReducer";

const reducer = combineReducers({
	inventoryList: inventoryListReducer,
	inventoryCreate: inventoryCreateReducer,
	inventoryUpdate: inventoryUpdateReducer,
	inventoryDelete: inventoryDeleteReducer,
});

// const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
	//userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

//const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
