import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="container ">
    <h1 className="notHeader">Lost Your Way ?</h1>
    <p className="para1 mb-5">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="button1 m-auto">
        Go to Homes
      </button>
    </Link>
  </div>
)
export default NotFound
