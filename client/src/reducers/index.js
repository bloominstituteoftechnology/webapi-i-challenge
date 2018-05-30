import { FETCHING_USERS, FETCH_USERS, ERROR } from '../actions'

const initialState = {
    loading: false,
    error: null,
    users: {}
}
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_USERS:
        return Object.assign({}, state, {
            loading: true,
        });
        case FETCH_USERS:
        let newUsers = {};
        action.payload.data.users.forEach(user => {newUsers[user.id] = user})
        return Object.assign({}, state, {
            loading: false,
            users: Object.assign({}, state.users, newUsers)
        });
        case ERROR:
        return Object.assign({}, state, {
            loading: false,
            error: true,
        });
        default:
            return state;
    }
}
export default userReducer
