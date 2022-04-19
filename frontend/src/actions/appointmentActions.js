export const SET_APPOINTMENT_ACTION = "SET_APPOINTMENT_ACTION";
export const SET_APPOINTMENT_LOADING = "SET_APPOINTMENT_LOADING";
export const setAppointments = (appointments) => ({
  type: SET_APPOINTMENT_ACTION,
  payload: appointments
});

export const setAppointmentLoading = (state) => ({
  type: SET_APPOINTMENT_LOADING,
  payload: state
})