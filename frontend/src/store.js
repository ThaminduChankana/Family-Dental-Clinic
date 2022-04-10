import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	basicTreatmentListReducer,
	basicTreatmentCreateReducer,
	basicTreatmentUpdateReducer,
	basicTreatmentDeleteReducer,
} from "./reducers/basicTreatmentReducer";

import {
	fillingListReducer,
	fillingCreateReducer,
	fillingUpdateReducer,
	fillingDeleteReducer,
} from "./reducers/fillingReducer";

import {
	orthodonticListReducer,
	orthodonticCreateReducer,
	orthodonticUpdateReducer,
	orthodonticDeleteReducer,
} from "./reducers/orthodonticReducer";

const reducer = combineReducers({
	basicTreatmentList: basicTreatmentListReducer,
	basicTreatmentCreate: basicTreatmentCreateReducer,
	basicTreatmentUpdate: basicTreatmentUpdateReducer,
	basicTreatmentDelete: basicTreatmentDeleteReducer,
	fillingList: fillingListReducer,
	fillingCreate: fillingCreateReducer,
	fillingUpdate: fillingUpdateReducer,
	fillingDelete: fillingDeleteReducer,
	orthodonticList: orthodonticListReducer,
	orthodonticCreate: orthodonticCreateReducer,
	orthodonticUpdate: orthodonticUpdateReducer,
	orthodonticDelete: orthodonticDeleteReducer,
});

// const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
	//userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

//const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
