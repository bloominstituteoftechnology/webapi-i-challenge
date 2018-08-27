import axios from 'axios';

export const FETCHING_USERS = 'FETCHING_USERS';
export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS';
export const USERS_FETCH_ERROR = 'USERS_FETCH_ERROR';

const URL = 'http://localhost:9000/users'

export const fetchUsers = () => dispatch => {
  dispatch({ type: FETCHING_USERS })
    axios.get(URL)
      .then(response => {
        dispatch({ 
          type: USERS_FETCH_SUCCESS,
          payload: response.data
         })
      })
}