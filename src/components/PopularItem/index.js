import {Link} from 'react-router-dom'
import './index.css'

const PopularItem = props => {
  const {eachPopularItem} = props
  const {id, backdropPath, overview, posterPath, title} = eachPopularItem

  return (
    <li className="container4">
      <Link to={`/movies/${id}`}>
        <div>
          <img src={backdropPath} alt={title} className="image4" />
        </div>
      </Link>
    </li>
  )
}

export default PopularItem
