import axios from 'axios'

export const FETCH_USERS = "FETCH_USERS"
export const FETCHING_USERS = "FETCHING_USERS"
export const ERROR = "ERROR"

export const fetchUsers = () => {
    const fetchU = axios.get(`http://localhost:5555/api/users/`);
    return function(dispatch) {
        dispatch({
            type: FETCHING_USERS
        });
        fetchU
            .then(response => {
                dispatch({
                    type: FETCH_USERS,
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            })
    }
}