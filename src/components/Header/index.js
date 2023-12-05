import {Component} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {onNavClick: false}

  onClickNavFunction = () => {
    const {onNavClick} = this.state
    this.setState({onNavClick: !onNavClick})
  }

  onClickCloseFunction = () => {
    const {onNavClick} = this.state
    this.setState({onNavClick: false})
  }

  render() {
    const {onNavClick} = this.state
    console.log('uyfd', onNavClick)

    return (
      <div>
        <div className="headerContainer">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264261/Group_7399_qh7djr.png"
              alt="website logo"
              className="imageMovie"
            />
          </Link>
          <ul className="d-flex flex-row justify-content-start mt-4 ulConList">
            <Link to="/">
              <li className="listItem">Home</li>
            </Link>
            <Link to="/popular">
              <li className="listItem">Popular</li>
            </Link>
          </ul>
          <div className="subCon9">
            <Link to="/search">
              <button
                type="button"
                className="listItemSearch mt-2"
                testId="searchButton"
              >
                <HiOutlineSearch />
              </button>
            </Link>
            <Link to="/account">
              <li className="listItemAccount ml-3 mr-5 pr-5">
                <img
                  src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264285/Avatar_ohrngv.png"
                  alt="profile"
                  className="profile"
                />
              </li>
            </Link>
          </div>

          <button
            type="button"
            className="buttonNav"
            onClick={this.onClickNavFunction}
          >
            <img
              src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701763447/add-to-queue_1_dsubyp.png"
              alt="nav"
              className="navConImage"
            />
          </button>
        </div>
        {onNavClick ? (
          <div className="containerPopup">
            <ul className="containerPopup">
              <Link to="/">
                <li className="homePopCon">Home</li>
              </Link>
              <Link to="/popular">
                <li className="homePopCon">Popular</li>
              </Link>
              <Link to="/account">
                <li className="homePopCon">Account</li>
              </Link>
            </ul>
            <button
              type="button"
              className="closeButtonPopup"
              onClick={this.onClickCloseFunction}
            >
              <IoIosCloseCircle className="closeConIcon" />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Header
