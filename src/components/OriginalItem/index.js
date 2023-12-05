import {Link} from 'react-router-dom'

import './index.css'

const OriginalItem = props => {
  const {originalListItem} = props
  const {id, posterPath, backdropPath, title} = originalListItem

  return (
    <div className="originalCon2">
      <Link to={`/movies/${id}`}>
        <img src={backdropPath} alt="title" className="imageItem1" />
      </Link>
    </div>
  )
}
export default OriginalItem
