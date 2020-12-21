import React, { Component } from "react";
import Styles from "./index.module.css";
import { Button } from "antd";
// interface ILogin {}

export default class Login extends Component<{}, {}> {
  render() {
    return (
      <div className={Styles.login}>
        <div className={Styles.login_box}>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button>LOGIN</button>
        </div>
      </div>
    );
  }
}

// TODO:
