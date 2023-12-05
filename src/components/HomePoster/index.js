import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'

const apiStatusConstantsOriginal = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomePoster extends Component {
  state = {posterData: [], apiStatusOrig: apiStatusConstantsOriginal.initial}

  componentDidMount() {
    this.getOriginalItems()
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
        posterData: updatedOriginalData,
        apiStatusOrig: apiStatusConstantsOriginal.success,
      })
    } else {
      this.setState({apiStatusOrig: apiStatusConstantsOriginal.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container12" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failureCon6">
      <img
        src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264344/alert-triangle_mbpmcv.png"
        alt="failureView"
        className="mb-4"
      />
      <h1 className="failureHead mb-5">
        Something went wrong. Please try again
      </h1>
      <button type="button" className="failureButton m-auto">
        Try Again
      </button>
    </div>
  )

  successPosterOriginalListView = () => {
    const {posterData} = this.state
    const randomIndex = Math.floor(Math.random() * posterData.length)
    const randomPosterData = posterData[randomIndex]
    console.log('random', randomPosterData)
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${randomPosterData.backdropPath})`,
            backgroundSize: 'cover',
          }}
        >
          <div>
            <Header />
          </div>
          <div className="eachSubCon1 p-5">
            <h1 className="head33 ml-3 mt-5">{randomPosterData.title}</h1>
            <p className="para6Over ml-3 mb-5">{randomPosterData.overview}</p>
            <button type="button" className="ml-3 buttonPlay">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderOriginalSwitchCase = () => {
    const {apiStatusOrig} = this.state
    switch (apiStatusOrig) {
      case apiStatusConstantsOriginal.success:
        return this.successPosterOriginalListView()
      case apiStatusConstantsOriginal.failure:
        return this.renderFailureView()
      case apiStatusConstantsOriginal.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container-post">{this.renderOriginalSwitchCase()}</div>
    )
  }
}
export default HomePoster
