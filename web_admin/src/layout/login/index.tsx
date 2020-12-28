import React, { Component } from "react";
import { httpPostLogin } from '../../api/api'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { message } from 'antd'
import Styles from "./index.module.css";

class Login extends Component<RouteComponentProps> {
  state = {
    username: "",
    password: "",
  };
  private inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value.trim()
    this.setState({
      [name]: value
    })
  }
  private btnLogin = async () => {
    const { username, password } = this.state
    const { data, success } = await httpPostLogin({ username, password })
    if (!success) { return message.error('密码错误') }
    message.success('登陆成功')
    localStorage.setItem('token', data.token)
    this.props.history.push('/')
  };
  render() {
    return (
      <div className={Styles.login}>
        <div className={Styles.login_box}>
          <input type="text" name="username" placeholder="username" onChange={this.inputChange} />
          <input type="password" name='password' placeholder="Password" onChange={this.inputChange} />
          <button onClick={this.btnLogin}>LOGIN</button>
        </div>
      </div>
    );
  }
}
export default withRouter(Login)