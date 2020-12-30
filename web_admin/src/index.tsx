import React from "react";
import ReactDOM from "react-dom";
import App from "./layout/App";
import { Provider } from 'react-redux'
import "./styles/index.css";
import store from './redux'
ReactDOM.render(
    <Provider store={store}><App /></Provider>, document.getElementById("root"));
