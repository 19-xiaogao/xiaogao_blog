import React from "react";
import Login from "../views/login";
import Home from '../views/home'
import { BrowserRouter as Router, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Router>
    </>
  );
};

export default App;
