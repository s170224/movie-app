import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Header from '../Header'
import SimilarMovies from '../SimilarMovies'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MoviesDetailItem extends Component {
  state = {
    eachMovies: [],
    similarMovies: [],
    genresList: [],
    spokenList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEachMovieDetails()
  }

  getEachMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log('id', id)
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken} `,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log('movidet', data)
      const upDateMovieData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      const updateSimilarMovieList = data.movie_details.similar_movies.map(
        eachMovie => ({
          id: eachMovie.id,
          backdropPath: eachMovie.backdrop_path,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }),
      )
      const updateGenres = data.movie_details.genres.map(eachRev => ({
        id: eachRev.id,
        name: eachRev.name,
      }))
      const updateSpokenL = data.movie_details.spoken_languages.map(
        eachSpoken => ({
          englishName: eachSpoken.english_name,
          id: eachSpoken.id,
        }),
      )

      this.setState({
        eachMovies: upDateMovieData,
        similarMovies: updateSimilarMovieList,
        genresList: updateGenres,
        spokenList: updateSpokenL,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container1" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onClickTry = () => {
    this.getEachMovieDetails()
  }

  renderFailureView = () => (
    <div className="failureCon1">
      <img
        src="https://res.cloudinary.com/dfspo6ey6/image/upload/v1701264344/alert-triangle_mbpmcv.png"
        alt="failure view"
        className="mb-3"
      />
      <p className="failureHead mb-5">Something went wrong. Please try again</p>
      <button
        type="button"
        className="failureButton m-auto mb-5 mt-5"
        onClick={this.onClickTry}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessMovies = () => {
    const {eachMovies, similarMovies, genresList, spokenList} = this.state
    const hours = parseInt(eachMovies.runtime / 60)
    const minutes = eachMovies.runtime - hours * 60
    const dateString = eachMovies.releaseDate
    const dateObject = new Date(dateString)
    const year = dateObject.getFullYear()
    return (
      <div className="sucCon">
        <div
          style={{
            backgroundImage: `url(${eachMovies.backdropPath})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="eachSubCon p-5">
            <h1 className="head3">{eachMovies.title}</h1>
            <div className="movCon mb-2 mt-4">
              <p className="paraRun ml-1 mt-1">
                {hours}h {minutes}m
              </p>
              {eachMovies.adult ? (
                <button type="button" className="uaCon ml-4">
                  A
                </button>
              ) : (
                <button type="button" className="uaCon ml-4">
                  U/A
                </button>
              )}
              <p className="paraRelease ml-4 mt-1">{year}</p>
            </div>
            <p className="para6 ml-1 mb-1">{eachMovies.overview}</p>
            <button type="button" className="ml-1 mt-3 buttonPlay">
              Play
            </button>
          </div>
        </div>
        <div className="subListCon ml-2 pr-2 pt-5">
          <div>
            <h1 className="paragen ml-4">Genres</h1>
            <ul>
              {genresList.map(eachGenres => (
                <li key={eachGenres.id} className="listGenres  mb-2">
                  {eachGenres.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="paragen ml-4">Audio Available</h1>
            <ul>
              {spokenList.map(eachSpoken => (
                <li key={eachSpoken.id} className="listGenres mb-2">
                  {eachSpoken.englishName}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="paragen ml-4">Rating Count</h1>
            <p className="listGenres ml-4">{eachMovies.voteCount}</p>
            <h1 className="paragen ml-4">Rating Average</h1>
            <p className="listGenres ml-4">{eachMovies.voteAverage}</p>
          </div>
          <div className="mr-5 pr-5 ml-3">
            <h1 className="paragen ml-4">Budget</h1>
            <p className="listGenres ml-4">{eachMovies.budget}</p>
            <h1 className="paragen ml-4">Release Date</h1>
            <p className="listGenres ml-4">{eachMovies.releaseDate}</p>
          </div>
        </div>
        <div>
          <h1 className="moreHead ml-5">More like this </h1>
          <ul className="similarContainer">
            {similarMovies.map(eachMovie => (
              <SimilarMovies key={eachMovie.id} eachSimilarMovie={eachMovie} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderMoviesDetailCase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessMovies()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-main-con">
        <div>
          <Header />
        </div>
        {this.renderMoviesDetailCase()}
        <div className="iconContainer">
          <FaGoogle className="iconC1" />
          <FaTwitter className="iconC1" />
          <FaInstagram className="iconC1" />
          <FaYoutube className="iconC1" />
        </div>
        <p className="iconHead">Contact Us</p>
      </div>
    )
  }
}
export default withRouter(MoviesDetailItem)
