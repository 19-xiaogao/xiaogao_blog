import React from "react";
import Login from "../../views/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Route path="/" component={Login} />
      </Router>
    </>
  );
};

export default App;
