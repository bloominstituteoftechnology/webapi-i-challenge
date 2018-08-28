import {
	USERS_FETCH_SUCCESS,
	FETCHING_USERS,
	ADDING_USER,
	USER_ADD_SUCCESS,
	DELETING_USER,
	DELETE_USER_SUCCESS,
	UPDATING_USER,
	UPDATE_USER_SUCCESS,
} from "../actions";

const initialState = {
	users: [],
	fetchingUsers: false,
	addingUser: false,
	deletingUser: false,
	updatingUser: false,
};

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_USERS:
			return {
				...state,
				fetchingUsers: true,
			};
		case USERS_FETCH_SUCCESS:
			return {
				...state,
				users: [...action.payload],
				fetchingUsers: false,
			};
		case ADDING_USER:
			return {
				...state,
				addingUser: true,
			};
		case USER_ADD_SUCCESS:
			return {
				...state,
				users: [...state.users, action.payload],
				addingUser: false,
			};
		case DELETING_USER:
			return {
				...state,
				deletingUser: true,
			};
		case DELETE_USER_SUCCESS:
			return {
				...state,
				users: state.users.filter(
					user => user.id.toString() !== action.payload.id,
				),
			};
		case UPDATING_USER:
			return {
				...state,
				updatingUser: true,
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				users: state.users.map(user => {
					if (user.id.toString() !== action.payload.id) {
						return user;
					} else {
						return action.payload;
					}
				}),
			};

		default:
			return state;
	}
};
