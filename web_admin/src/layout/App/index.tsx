import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../login";
import Home from "../home";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
