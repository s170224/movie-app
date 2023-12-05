import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import NotFound from './components/NotFound'
import MoviesDetailItem from './components/MoviesDetailItem'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import SearchResult from './components/SearchResult'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movies/:id" component={MoviesDetailItem} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/search" component={SearchResult} />
    <Route component={NotFound} />
  </Switch>
)

export default App
