import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import Form from "./containers/Form";
import {reducer as formReducer} from 'redux-form'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = []

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const reducers = combineReducers({
  form: formReducer
})
const store = createStore(reducers, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <Form/>
  </Provider>,
  document.getElementById("app")
);

