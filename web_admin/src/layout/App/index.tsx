import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../login";
import Home from "../home";

const getToken = () => localStorage.getItem('token')

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" render={() => getToken() !== null ? <Redirect to="/" /> : <Login />} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
