import { SET_APPOINTMENT_ACTION, SET_APPOINTMENT_LOADING } from "../actions/appointmentActions";

const initialState = {
  appointments: [],
  isLoading: false,
};

const appointmentReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_APPOINTMENT_ACTION:
      return {
        ...state,
        appointments: action.payload
      };

    case SET_APPOINTMENT_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default: 
      return state;
  }
};

export default appointmentReducer;

