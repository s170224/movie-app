import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import TrendingItem from '../TrendingItem'
import OriginalItem from '../OriginalItem'
import HomePoster from '../HomePoster'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiStatusConstantsOriginal = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    trendingList: [],
    originalList: [],
    apiStatus: apiStatusConstants.initial,
    apiStatusOrig: apiStatusConstantsOriginal.initial,
  }

  componentDidMount() {
    this.getTrendingItems()
    this.getOriginalItems()
  }

  getTrendingItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
      console.log('trendingList', data)
      const updatedData = data.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        overview: eachItem.overview,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        trendingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getOriginalItems = async () => {
    this.setState({
      apiStatusOrig: apiStatusConstantsOriginal.inProgress,
    })
    const url = 'https://apis.ccbp.in/movies-app/originals'
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
      const updatedOriginalData = data.results.map(eachData => ({
        id: eachData.id,
        backdropPath: eachData.backdrop_path,
        overview: eachData.overview,
        posterPath: eachData.poster_path,
        title: eachData.title,
      }))
      this.setState({
        originalList: updatedOriginalData,
        apiStatusOrig: apiStatusConstantsOriginal.success,
      })
    } else {
      this.setState({apiStatusOrig: apiStatusConstantsOriginal.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container-trade" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTryAgain1 = () => {
    this.getTrendingItems()
  }

  onClickTryAgainOrg = () => {
    this.getOriginalItems()
  }

  renderFailureViewTrend = () => (
    <div className="failureTrade">
      <img
        src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264344/alert-triangle_mbpmcv.png"
        alt="failure view"
      />
      <p className="failureHead">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failureButton m-auto"
        onClick={this.onClickTryAgain1}
      >
        Try Again
      </button>
    </div>
  )

  renderFailureViewOrg = () => (
    <div className="failureTrade">
      <img
        src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264344/alert-triangle_mbpmcv.png"
        alt="failure view"
      />
      <p className="failureHead">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failureButton m-auto"
        onClick={this.onClickTryAgainOrg}
      >
        Try Again
      </button>
    </div>
  )

  successViewTrending = () => {
    const {trendingList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {trendingList.map(eachTrendItem => (
            <TrendingItem key={eachTrendItem.id} trendItem={eachTrendItem} />
          ))}
        </Slider>
      </div>
    )
  }

  successOriginalListView = () => {
    const {originalList} = this.state

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {originalList.map(eachOriginalItem => (
            <OriginalItem
              key={eachOriginalItem.id}
              originalListItem={eachOriginalItem}
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderTrendingSwitchCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successViewTrending()
      case apiStatusConstants.failure:
        return this.renderFailureViewTrend()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderOriginalSwitchCase = () => {
    const {apiStatusOrig} = this.state
    switch (apiStatusOrig) {
      case apiStatusConstantsOriginal.success:
        return this.successOriginalListView()
      case apiStatusConstantsOriginal.failure:
        return this.renderFailureViewOrg()
      case apiStatusConstantsOriginal.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <div className="containerBack">
          <div>
            <HomePoster />
          </div>
        </div>
        <div className="containerTrending">
          <h1 className="trendingHead ml-5">Trending Now</h1>
          <div>{this.renderTrendingSwitchCase()}</div>
          <h1 className="trendingHead ml-5">Originals</h1>
          <div>{this.renderOriginalSwitchCase()}</div>
          <div className="iconContainer">
            <FaGoogle className="iconC1" />
            <FaTwitter className="iconC1" />
            <FaInstagram className="iconC1" />
            <FaYoutube className="iconC1" />
          </div>
          <p className="iconHead">Contact us</p>
        </div>
      </div>
    )
  }
}
export default Home
