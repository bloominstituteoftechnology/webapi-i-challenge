import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import userReducer from '../src/reducers'
import './index.css';
import App from './App.js'

const store = createStore(userReducer, (applyMiddleware(thunk, logger)));

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'));
