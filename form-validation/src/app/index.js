import {createStore, combineReducers} from 'redux'
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import Form from "./containers/Form";
import {reducer as formReducer} from 'redux-form'

const reducers = combineReducers({
  form: formReducer
})
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Form/>
  </Provider>,
  document.getElementById("app")
);

