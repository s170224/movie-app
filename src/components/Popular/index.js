import {Component} from 'react'

import Cookies from 'js-cookie'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import PopularItem from '../PopularItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularList()
  }

  getPopularList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatePopularData = data.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        popularList: updatePopularData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderPopularSuccessView = () => {
    const {popularList} = this.state
    return (
      <div className="poplar-con1">
        <ul className="popularListClass">
          {popularList.map(eachMovie => (
            <PopularItem key={eachMovie.id} eachPopularItem={eachMovie} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView1 = () => (
    <div className="loader-container1" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTry1 = () => {
    this.getPopularList()
  }

  renderFailureView = () => (
    <div className="failureCon1">
      <img
        src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264344/alert-triangle_mbpmcv.png"
        alt="failure view"
        className="mb-4"
      />
      <p className="failureHead mb-5">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failureButton m-auto mb-5"
        onClick={this.onClickTry1}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView1()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popCon">
        <div>
          <Header />
        </div>
        <div className="popCon">{this.renderPopularSwitchCase()}</div>
        <div className="iconContainer">
          <FaGoogle className="iconC1" />
          <FaTwitter className="iconC1" />
          <FaInstagram className="iconC1" />
          <FaYoutube className="iconC1" />
        </div>
        <p className="iconHead  pb-4">Contact Us</p>
      </div>
    )
  }
}

export default Popular
