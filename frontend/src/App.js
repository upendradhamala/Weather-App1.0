import React from 'react'
import Landing from './Components/Landing'
import Login from './Components/Login'
import Register from './Components/Register'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Landing} exact />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </Router>
  )
}

export default App
