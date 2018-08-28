import axios from "axios";

export const FETCHING_USERS = "FETCHING_USERS";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
export const USERS_FETCH_ERROR = "USERS_FETCH_ERROR";

export const ADDING_USER = "ADDING_USER";
export const USER_ADD_SUCCESS = "USER_ADD_SUCCESS";
export const USER_ADD_FAILURE = "USER_ADD_FAILURE";

export const DELETING_USER = "DELETING_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const UPDATING_USER = "UPDATING_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

const URL = "http://localhost:9000/users";

export const fetchUsers = () => dispatch => {
	dispatch({ type: FETCHING_USERS });
	axios.get(URL).then(response => {
		dispatch({
			type: USERS_FETCH_SUCCESS,
			payload: response.data,
		});
	});
};

export const addUser = user => dispatch => {
	dispatch({ type: ADDING_USER });
	axios.post(URL, user).then(response => {
		dispatch({
			type: USER_ADD_SUCCESS,
			payload: response.data,
		});
	});
};

export const deleteUser = id => dispatch => {
	dispatch({ type: DELETING_USER });
	axios.delete(`${URL}/${id}`).then(response => {
		dispatch({
			type: DELETE_USER_SUCCESS,
			payload: response.data,
		});
	});
};

export const updateUser = (id, data) => dispatch => {
	dispatch({ type: UPDATING_USER });
	axios.put(`${URL}/${id}`, data).then(response => {
		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: response.data,
		});
	});
};
