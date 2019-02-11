import {
    FAIL,
    FETCHING,
    FETCHED,
    ADDING,
    ADDED,
    UPDATING,
    UPDATED,
    DELETING,
    DELETED    
}from '../actions';

const initialListState = {
    fetchingList: false,
    addingUser: false,
    updatingUser: false,
    deletingUser: false,
    users: [],
    error: null
  }

export const listReducer = (state = initialListState, action) => {
    switch (action.type) {
        case FETCHING:
            return {
                ...state,
                fetchingList: true,
                error: ''
            }
        case FETCHED: {
            return {
                ...state,
                users: action.payload,
                fetchingList: false,
                error: ''
            }
        }
        case ADDING:
            return {
                ...state,
                addingUser: true,
                error: ''
            }
        case ADDED:
            return {
                ...state,
                Users: action.payload,
                addingUser: false,
                error: ''
            }
        case DELETING:
            return {
                ...state,
                deletingUser: true,
                error: ''
            }
        case DELETED:
            return {
                ...state,
                deletingUser: false,
                error: ''
            }
        case UPDATING:
            return {
                ...state,
                updatingUser: true,
                error: ''
            }
        case UPDATED:
            return {
                ...state,
                updatingUser: false,
                error: ''
            }
        case FAIL:
            return {
                ...state,
                fetchingList: false,
                addingUser: false,
                updatingUser: false,
                deletingUser: false,
                error: action.payload
            }
        default:
            return state;
    }
}