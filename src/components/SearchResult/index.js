import {Component} from 'react'
import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchResult extends Component {
  state = {
    inputSearch: '',
    searchList: [],
    apiStatus: apiStatusConstants.initial,
    onNavClick: false,
  }

  onChangeInputSearchValue = event => {
    this.setState({inputSearch: event.target.value})
  }

  onGetSearchItem = async () => {
    const {inputSearch} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const searchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${inputSearch}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(searchUrl, options)
    console.log('responseSearch', response)
    if (response.ok === true) {
      const data = await response.json()

      console.log('serachData', data)
      const updateSearchList = data.results.map(eachSearch => ({
        backdrop_path: eachSearch.backdrop_path,
        id: eachSearch.id,
        poster_path: eachSearch.poster_path,
        title: eachSearch.title,
      }))

      this.setState({
        searchList: updateSearchList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickNavFunction = () => {
    const {onNavClick} = this.state
    this.setState({onNavClick: !onNavClick})
  }

  onClickCloseFunction = () => {
    const {onNavClick} = this.state
    this.setState({onNavClick: false})
  }

  onClickTryAgain = () => {
    this.onGetSearchItem()
  }

  renderSearchLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSearchFailureView = () => {
    const {inputSearch} = this.state
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264335/Background-Complete_nwjnss.png"
          alt="failure view"
        />
        <h1 className="failureHead">Something went wrong. Please try again</h1>
        <button
          type="button"
          className="failureButton"
          onClick={this.onClickTryAgain}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchList, inputSearch} = this.state
    const searchListLength = searchList.length === 0
    console.log('sear', searchListLength)

    return (
      <div className="changeBachGroundColor">
        {searchListLength ? (
          <div className="didNotMatchContainer">
            <img
              src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701607893/Group_3_ykmtgb.png"
              alt="no movies"
            />
            <p className="headNot1">
              Your search for {inputSearch} did not find any matches.
            </p>
          </div>
        ) : (
          <div>
            <ul className="searchSubList">
              {searchList.map(eachSearchItem => (
                <li key={eachSearchItem.id} className="searchList1">
                  <Link to={`/movies/${eachSearchItem.id}`}>
                    <img
                      src={eachSearchItem.backdrop_path}
                      alt={eachSearchItem.title}
                      className="searchImage1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  renderTrendingSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      case apiStatusConstants.inProgress:
        return this.renderSearchLoadingView()
      default:
        return null
    }
  }

  render() {
    const {inputSearch, onNavClick} = this.state

    return (
      <div className="searchContainerMain3">
        <div>
          <div className="headerContainer">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264261/Group_7399_qh7djr.png"
                alt="website logo"
                className="imageMovie2"
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
            <div className="subCon">
              <div className="searchCon3 mt-2 mr-3">
                <input
                  type="search"
                  placeholder="search"
                  onChange={this.onChangeInputSearchValue}
                  value={inputSearch}
                  className="inputSearchCon"
                />
                <button
                  type="button"
                  testid="searchButton"
                  onClick={this.onGetSearchItem}
                  className="searchBut"
                >
                  <HiOutlineSearch />
                </button>
              </div>
              <Link to="/account">
                <li className="listItemAccount ml-3">
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
        <div>{this.renderTrendingSwitchCase()}</div>
      </div>
    )
  }
}

export default SearchResult
