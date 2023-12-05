import {Link} from 'react-router-dom'

import './index.css'

const TrendingItem = props => {
  const {trendItem} = props
  const {id, posterPath, backdropPath, title} = trendItem

  return (
    <div className="liConT">
      <Link to={`/movies/${id}`}>
        <img src={backdropPath} alt={title} className="image12" />
      </Link>
    </div>
  )
}

export default TrendingItem
