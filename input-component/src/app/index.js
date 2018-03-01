import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'

import {reducer as formReducer} from 'redux-form'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleware = []

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const reducers = combineReducers({
  form: formReducer
})
const store = createStore(reducers, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById("app")
);

