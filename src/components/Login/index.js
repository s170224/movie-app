import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onchangeName = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  submitSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  failureView = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.submitSuccessView(data.jwt_token)
    } else {
      this.failureView(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="mainContainer">
        <div className="ml-5 pb-3">
          <img
            src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264261/Group_7399_qh7djr.png"
            alt="login website logo"
            className="image1Logo"
          />
        </div>
        <div className="loginContainer m-auto pt-5">
          <h1 className="heading1">Login</h1>
          <form onSubmit={this.onSubmitDetails}>
            <div className="d-flex flex-column justify-content-center ml-5">
              <label htmlFor="input1" className="labelName">
                USERNAME
              </label>
              <input
                type="text"
                id="input1"
                placeholder="user name"
                className="inputName mb-4"
                onChange={this.onchangeName}
                value={username}
              />
            </div>
            <div className="d-flex flex-column justify-content-end ml-5">
              <label htmlFor="password1" className="labelName">
                PASSWORD
              </label>
              <input
                type="password"
                id="password1"
                placeholder="password"
                className="inputName mb-4"
                onChange={this.onchangePassword}
                value={password}
              />
            </div>
            {showErrorMsg && <p className="errorPara ml-5">*{errorMsg}</p>}
            <button type="submit" className="loginButton ml-5 mt-2">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
