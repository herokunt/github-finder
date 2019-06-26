import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import './App.css';

const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const searchUsers = async (text) => {
    setLoading(true)
    const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    setUsers(data.items)
    setLoading(false)
  }

  const getUser = async (username) => {
    setLoading(true)
    const res = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    setUser(data)
    setLoading(false)
  }

  const getUserRepos = async (username) => {
    setLoading(true)
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    setRepos(data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  const showAlert = (message, type) => {
    setAlert({message, type})
    setTimeout(() => setAlert(null), 4000)
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Alert alert={alert}/>
        <Switch>
        // NOTE! the props below come from the ROUTER, things like 'match', 'history' and others
          <Route exact path='/' render={props => (
            <Fragment>
              <Search
                searchUsers={searchUsers}
                clearUsers={clearUsers}
                setAlert={showAlert}
                showClear={users.length > 0 ? true : false}
              />
              <Users loading={loading} users={users}/>
            </Fragment>
            )}
          />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' render={props => (
            <User
              { ...props }
              getUser={getUser}
              getUserRepos={getUserRepos}
              user={user}
              repos={repos}
              loading={loading} />
          )}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
