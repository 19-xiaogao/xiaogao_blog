import React from "react";
import { useSelector } from 'react-redux'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Login from "../login";
import Home from "../home";
import PrivateRouter from '../../components/PrivateRouter'

import { selector } from '../../redux/selector'

const App: React.FC = () => {
  const token = useSelector(selector)
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" render={() => typeof token === 'string' ? <Redirect to="/" /> : <Login />} />
          <PrivateRouter path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};


export default App;
