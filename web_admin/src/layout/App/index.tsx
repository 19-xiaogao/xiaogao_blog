import React from "react";
import Login from "../login";
import Home from '../home'
import { BrowserRouter as Router, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />
      </Router>
    </>
  );
};

export default App;
