import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import App from "./App";
import rootReducer from "./reducers";
import { CssBaseline } from "@material-ui/core";

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<React.Fragment>
			<CssBaseline />
			<App />
		</React.Fragment>
	</Provider>,
	document.getElementById("root"),
);
