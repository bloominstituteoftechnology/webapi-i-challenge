import { combineReducers } from 'redux';
import { listReducer } from './listReducer';


const rootReducer = combineReducers({
    list: listReducer
});

export default rootReducer;