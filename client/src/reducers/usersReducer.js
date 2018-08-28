import { USERS_FETCH_SUCCESS, FETCHING_USERS } from "../actions";

const initialState = {
	users: [],
	fetchingUsers: false,
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
		default:
			return state;
	}
};
