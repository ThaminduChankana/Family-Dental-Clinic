import axios from "axios";
import {
	MEDICALHISTORY_CREATE_FAIL,
	MEDICALHISTORY_CREATE_REQUEST,
	MEDICALHISTORY_CREATE_SUCCESS,
	MEDICALHISTORY_DELETE_FAIL,
	MEDICALHISTORY_DELETE_REQUEST,
	MEDICALHISTORY_DELETE_SUCCESS,
	MEDICALHISTORY_LIST_FAIL,
	MEDICALHISTORY_LIST_REQUEST,
	MEDICALHISTORY_LIST_SUCCESS,
	MEDICALHISTORY_UPDATE_FAIL,
	MEDICALHISTORY_UPDATE_REQUEST,
	MEDICALHISTORY_UPDATE_SUCCESS,
	MEDICALHISTORY_LIST_DOCTOR_REQUEST,
	MEDICALHISTORY_LIST_DOCTOR_SUCCESS,
	MEDICALHISTORY_LIST_DOCTOR_FAIL,
	MEDICALHISTORY_VIEW_PATIENT_REQUEST,
	MEDICALHISTORY_VIEW_PATIENT_SUCCESS,
	MEDICALHISTORY_VIEW_PATIENT_FAIL,
} from "../constants/medicalHistoryConstants";
import swal from "sweetalert";

export const listMedicalHistories = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: MEDICALHISTORY_LIST_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/admin/medical_history`, config);

		dispatch({
			type: MEDICALHISTORY_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: MEDICALHISTORY_LIST_FAIL,
			payload: message,
		});
	}
};

export const createMedicalHistoryAction =
	(
		nic,
		pname,
		previousDentalhistory,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherDiseases,
		vaccinations,
		covidDiagnose,
		fluSymptoms,
		covidConfirmation
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: MEDICALHISTORY_CREATE_REQUEST,
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
				`/user/admin/medical_history/create`,
				{
					nic,
					pname,
					previousDentalhistory,
					dentalConcerns,
					medicalConcerns,
					currentMedications,
					otherDiseases,
					vaccinations,
					covidDiagnose,
					fluSymptoms,
					covidConfirmation,
				},
				config
			);

			dispatch({
				type: MEDICALHISTORY_CREATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Medical History Created Successfully.",
				icon: "success",
				timer: 2000,
				button: false,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: MEDICALHISTORY_CREATE_FAIL,
				payload: message,
			});
		}
	};

export const updateMedicalHistoryAction =
	(
		id,
		nic,
		pname,
		previousDentalhistory,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherDiseases,
		vaccinations,
		covidDiagnose,
		fluSymptoms,
		covidConfirmation
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: MEDICALHISTORY_UPDATE_REQUEST,
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
				`/user/admin/medical_history/${id}`,
				{
					nic,
					pname,
					previousDentalhistory,
					dentalConcerns,
					medicalConcerns,
					currentMedications,
					otherDiseases,
					vaccinations,
					covidDiagnose,
					fluSymptoms,
					covidConfirmation,
				},
				config
			);

			dispatch({
				type: MEDICALHISTORY_UPDATE_SUCCESS,
				payload: data,
			});
			swal({
				title: "Success !!!",
				text: "Medical History Updated Successfully.",
				icon: "success",
				timer: 2000,
				button: false,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: MEDICALHISTORY_UPDATE_FAIL,
				payload: message,
			});
		}
	};

export const deleteMedicalHistoryAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: MEDICALHISTORY_DELETE_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/admin/medical_history/${id}`, config);

		dispatch({
			type: MEDICALHISTORY_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: MEDICALHISTORY_DELETE_FAIL,
			payload: message,
		});
	}
};

export const listMedicalHistoriesforDoctor = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: MEDICALHISTORY_LIST_DOCTOR_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.get(`/user/doctor/medical_history`, config);

		dispatch({
			type: MEDICALHISTORY_LIST_DOCTOR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: MEDICALHISTORY_LIST_DOCTOR_FAIL,
			payload: message,
		});
	}
};

export const patientViewMedicalHistoryAction =
	(
		id,
		nic,
		pname,
		previousDentalhistory,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherDiseases,
		vaccinations,
		covidDiagnose,
		fluSymptoms,
		covidConfirmation
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: MEDICALHISTORY_VIEW_PATIENT_REQUEST,
			});

			const {
				patient_Login: { patientInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${patientInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`/user/patient/medical_history/${id}`,
				{
					nic,
					pname,
					previousDentalhistory,
					dentalConcerns,
					medicalConcerns,
					currentMedications,
					otherDiseases,
					vaccinations,
					covidDiagnose,
					fluSymptoms,
					covidConfirmation,
				},
				config
			);

			dispatch({
				type: MEDICALHISTORY_VIEW_PATIENT_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = error.response && error.response.data.message ? error.response.data.message : error.message;
			dispatch({
				type: MEDICALHISTORY_VIEW_PATIENT_FAIL,
				payload: message,
			});
		}
	};
