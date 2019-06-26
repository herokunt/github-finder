import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  /*async componentDidMount(){
    this.setState({ loading: true })

    const res = await fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    console.log(data)

    this.setState({ users: data, loading: false })
  }*/

  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    // console.log(data)
    this.setState({ users: data.items, loading: false })
  }

  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    // console.log(data)
    this.setState({ user: data, loading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ loading: true })
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    console.log(data)
    this.setState({ repos: data, loading: false })
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false})
  }

  setAlert = (message, type) => {
    this.setState({ alert: { message, type }})
    setTimeout(() => {
      this.setState({ alert: null })
    }, 4000)
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Alert alert={this.state.alert}/>
          <Switch>
          // NOTE! the props below come from the ROUTER, things like 'match', 'history' and others
            <Route exact path='/' render={props => (
              <Fragment>
                <Search
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  setAlert={this.setAlert}
                  showClear={this.state.users.length > 0 ? true : false}
                />
                <Users loading={this.state.loading} users={this.state.users}/>
              </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User
                { ...props }
                getUser={this.getUser}
                getUserRepos={this.getUserRepos}
                user={this.state.user}
                repos={this.state.repos}
                loading={this.state.loading} />
            )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
