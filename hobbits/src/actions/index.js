import axios from 'axios';

axios.defaults.withCredentials = true;

const baseUrl = 'https://localhost:4000';

export const FAIL = 'FAIL';
export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';
export const ADDING = 'ADDING';
export const ADDED = 'ADDED';
export const UPDATING = 'UPDATING';
export const UPDATED = 'UPDATED';
export const DELETING = 'DELETING';
export const DELETED = 'DELETED'; 

export const fetchList = () => dispatch => {
    dispatch({type: FETCHING});
    axios.get(`${baseUrl}/api/users/`)
        .then(res => dispatch({type: FETCHED, payload: res.data}))
        .catch(err => dispatch({type: FAIL, payload: err}));
}

export const addUser = x => dispatch => {
    dispatch({type: ADDING});
    axios.post(`${baseUrl}/api/users/`, x)
        .then(res => dispatch({type: ADDED, payload: res.data}))
        .then(() => fetchList()(dispatch))
        .catch(err => dispatch({type: FAIL, payload: err}));
}

export const updateUser = (id, x) => dispatch => {
    dispatch({type: UPDATING});
    axios.put(`${baseUrl}/api/users/${id}`, x)
        .then(res => dispatch({type: UPDATED, payload: res.data}))
        .then(() => fetchList()(dispatch))
        .catch(err => dispatch({type: FAIL, payload: err}))
}

export const deleteUser = (id) => dispatch => {
    dispatch({type: DELETING});
    axios.delete(`${baseUrl}/api/users/${id}`)
        .then(res => dispatch({type: DELETED, payload: res.data}))
        .then(() => fetchList()(dispatch))
        .catch(err => dispatch({type: FAIL, payload: err}))
}