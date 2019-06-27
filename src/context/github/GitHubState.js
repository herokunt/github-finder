import React, { useReducer } from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING, SET_ALERT, REMOVE_ALERT } from '../types'

const GithubState = (props) => {

  // Could use useState to set each of these individually but since we want to use useReducer we bundle them and pass them to useReducer
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search Users
  const searchUsers = async (text) => {
    setLoading()
    const res = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()
    console.log(data)

    dispatch({
      type: SEARCH_USERS,
      payload: data.items
    })
  }

  // Get User
  const getUser = async (username) => {
    setLoading()
    const res = await fetch(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()

    dispatch({
      type: GET_USER,
      payload: data
    })
  }

  // Get Repos
  const getUserRepos = async (username) => {
    setLoading()
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    const data = await res.json()

    dispatch({
      type: GET_REPOS,
      payload: data
    })
  }

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  // This is for anything we want to make available for the entire App, it has to wrap other components.
  // props.children are the components it wraps around and they have ofc to be rendered
  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState
