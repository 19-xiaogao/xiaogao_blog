import React, { Component } from "react";
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setToken } from '../../redux/action'
import { message } from 'antd'
import Styles from "./index.module.css";
import { httpPostLogin } from '../../api/api'

interface ILoginProps extends RouteComponentProps {
  onSetToken: (value: string) => void
}

class Login extends Component<ILoginProps, {}> {
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
    this.props.onSetToken(data.token)
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
const mapToDispatchProps = (dispatch: any) => ({
  onSetToken: (value: string) => dispatch(setToken(value))
})

export default connect(null, mapToDispatchProps)(withRouter(Login))