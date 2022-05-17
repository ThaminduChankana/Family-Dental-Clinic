import axios from "axios";
import {
	BLOGS_CREATE_FAIL,
	BLOGS_CREATE_REQUEST,
	BLOGS_CREATE_SUCCESS,
	BLOGS_DELETE_FAIL,
	BLOGS_DELETE_REQUEST,
	BLOGS_DELETE_SUCCESS,
	BLOGS_LIST_FAIL,
	BLOGS_LIST_REQUEST,
	BLOGS_LIST_SUCCESS,
	BLOGS_UPDATE_FAIL,
	BLOGS_UPDATE_REQUEST,
	BLOGS_UPDATE_SUCCESS,
	COMMON_BLOGS_LIST_FAIL,
	COMMON_BLOGS_LIST_REQUEST,
	COMMON_BLOGS_LIST_SUCCESS,
} from "../constants/blogsConstants";
import swal from "sweetalert";

export const listBlogsForUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: COMMON_BLOGS_LIST_REQUEST,
		});

		const { data } = await axios.get("/user/blogs");

		dispatch({
			type: COMMON_BLOGS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: COMMON_BLOGS_LIST_FAIL,
			payload: message,
		});
	}
};

export const listBlogs = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: BLOGS_LIST_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.get("/user/doctor/blogs", config);

		dispatch({
			type: BLOGS_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: BLOGS_LIST_FAIL,
			payload: message,
		});
	}
};

export const createBlogAction = (title, description, image) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BLOGS_CREATE_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				"Description-Type": "application/json",
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.post(`/user/doctor/blogs/create`, { title, description, image }, config);

		dispatch({
			type: BLOGS_CREATE_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Blog Article Created Successfully.",
			icon: "success",
			timer: 2000,
			button: false,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: BLOGS_CREATE_FAIL,
			payload: message,
		});
	}
};

export const updateBlogAction = (id, title, description, image) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BLOGS_UPDATE_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				"Description-Type": "application/json",
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.put(`/user/doctor/blogs/${id}`, { title, description, image }, config);

		dispatch({
			type: BLOGS_UPDATE_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Blog Article Updated Successfully.",
			icon: "success",
			timer: 2000,
			button: false,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: BLOGS_UPDATE_FAIL,
			payload: message,
		});
	}
};

export const deleteBlogAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BLOGS_DELETE_REQUEST,
		});

		const {
			doctor_Login: { doctorInfo },
		} = getState();

		const config = {
			headers: {
				"Description-Type": "application/json",
				Authorization: `Bearer ${doctorInfo.token}`,
			},
		};

		const { data } = await axios.delete(`/user/doctor/blogs/${id}`, config);

		dispatch({
			type: BLOGS_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: BLOGS_DELETE_FAIL,
			payload: message,
		});
	}
};
