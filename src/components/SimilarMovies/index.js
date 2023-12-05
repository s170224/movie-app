import './index.css'

const SimilarMovies = props => {
  const {eachSimilarMovie} = props
  const {backdropPath, title} = eachSimilarMovie

  return (
    <li className="simCon3">
      <div>
        <img src={backdropPath} alt={title} className="imageSim" />
      </div>
    </li>
  )
}
export default SimilarMovies
