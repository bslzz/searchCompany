import React from 'react'
import CompanyNameSearch from './components/companyName/companyNameSearch'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdvancedSearch from './components/advancedSearch/advancedSearch'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CompanyNameSearch />
        </Route>
        <Route exact path="/search">
          <AdvancedSearch />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
