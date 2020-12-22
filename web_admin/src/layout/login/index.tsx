import React, { Component } from "react";
import Styles from "./index.module.css";
export default class Login extends Component {
  render() {
    return (
      <div className={Styles.login}>
        <div className={Styles.login_box}>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>LOGIN</button>
        </div>
      </div>
    );
  }
}
