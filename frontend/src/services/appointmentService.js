import axios from 'axios';
import { setAppointmentLoading, setAppointments } from '../actions/appointmentActions';

const BASE_URL = "http://localhost:5000";

const getAuthToken = () => {
  const adminInfoFromStorage = localStorage.getItem("adminInfo") ? JSON.parse(localStorage.getItem("adminInfo")) : null;
  const patientInfoFromStorage = localStorage.getItem("patientInfo")
    ? JSON.parse(localStorage.getItem("patientInfo"))
    : null;

  return {
    isAdmin : adminInfoFromStorage ? true : false,
    token: adminInfoFromStorage?.token || patientInfoFromStorage?.token
  }
};

const getUrl = () => {
  const { isAdmin } = getAuthToken();

  if (isAdmin) {
    return `${BASE_URL}/user/admin`;
  }

  return `${BASE_URL}/user/patient`
}

const getHeaders = () => {
  const headers = {};
  const { token } = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const getAppointments = (date) => async (dispatch) => {
  try {
    dispatch(setAppointmentLoading(true));
    const appointments = await axios
    .get(`${getUrl()}/appointment?date=${date}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    });
    dispatch(setAppointments(appointments));
  } finally {
    dispatch(setAppointmentLoading(false));
  }
  
};

const getAppointmentById = async (id) => {
  return axios.get(`${getUrl()}/appointment/${id}`, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    });
}

const makeAppointment = async (appointment) => {
  return axios.post(`${getUrl()}/appointment`, appointment, { headers: getHeaders() })
    .then((response) => {
      return response.data;
    });
};

const editAppointment = async (appointmentId, appointment) => {
  return axios.put(`${getUrl()}/appointment/${appointmentId}`, 
    appointment, { headers: getHeaders() })
  .then((response) => {
    return response.data;
  });
};

const deleteAppointment = async (appointmentId) => {
  return axios.delete(`${getUrl()}/appointment/${appointmentId}`, { headers: getHeaders() })
  .then((response) => {
    return response.data;
  });
};

const appointmentService =  {
  getAppointments,
  getAppointmentById,
  makeAppointment,
  editAppointment,
  deleteAppointment,
};

export default appointmentService;