import {
	USERS_FETCH_SUCCESS,
	FETCHING_USERS,
	ADDING_USER,
	USER_ADD_SUCCESS,
} from "../actions";

const initialState = {
	users: [],
	fetchingUsers: false,
	addingUser: false,
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
		default:
			return state;
	}
};
