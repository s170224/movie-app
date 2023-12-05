import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'
import Header from '../Header'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="accountCon">
      <div>
        <Header />
        <div className="memberShipContainer">
          <h1 className="accountHead pt-5">Account</h1>
          <hr className="hrClass" />
          <div className="memCon1">
            <p className="memPara1">Member ship </p>
            <div className="ml-4">
              <p className="rahulPara">rahul@gmail.com</p>
              <p className="memPara">Password : ************</p>
            </div>
          </div>
          <hr className="hrClass" />
          <div className="planContainer">
            <p className="memPara1">Plan details </p>
            <p className="rahulPara ml-3">Premium </p>
            <p type="button" className="button4 ml-3">
              Ultra HD
            </p>
          </div>
          <hr className="hrClass mb-4" />
          <div className="d-flex flex-row justify-content-center mt-5">
            <button
              type="button"
              onClick={onClickLogout}
              className="logoutButton"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="iconContainer mt-5">
        <FaGoogle className="iconC1" />
        <FaTwitter className="iconC1" />
        <FaInstagram className="iconC1" />
        <FaYoutube className="iconC1" />
      </div>
      <p className="iconHead">Contact Us</p>
    </div>
  )
}
export default Account
