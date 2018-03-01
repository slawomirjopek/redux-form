import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NoRoutePage from '../NoRoutePage/NoRoutePage'
import { InputPage } from '../InputPage/InputPage'
import { InputSelectPage } from '../InputSelectPage/InputSelectPage'
import Header from '../../components/Layout/Header/Header'

import "./app.scss";

const App = () => (
  <div>
    <Header/>
    <main>
      <Switch>
        <Route path="/" component={InputPage} exact/>
        <Route path="/input-select" component={InputSelectPage} exact/>
        <Route component={NoRoutePage}/>
      </Switch>
    </main>
  </div>
)

export default App;