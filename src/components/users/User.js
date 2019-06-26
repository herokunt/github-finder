import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const User = ({ user, loading, repos, getUser, getUserRepos, getRepos, match}) => {

  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
    // eslint-disable-next-line
  }, [])

  const { name, avatar_url, location, bio, blog, company, login, html_url, followers, following, public_repos, public_gists, hireable } = this.props.user

  if (loading) return <Spinner />

  return (
    <Fragment>
      <Link to='/' className="btn btn-light" style={{ display: 'block' }}>Back to Results</Link>
      Hireable: {' '}
      {hireable ? (<i className="fas fa-check"/>) : (<i classname="fas fa-times-circle"/>)}
      <img src={avatar_url} className="round-img" alt="" style={{ width: '150px' }} />
      <h1>{name}</h1>
      <p>Location: {location}</p>
      {bio && (
        <Fragment>
          <h3>Bio</h3>
          <p>{bio}</p>
        </Fragment>
      )}
      <a href={html_url} className="btn btn-dark my-1">Visit Profile</a>
      <ul>
        <li>{login && <Fragment><strong>Username: </strong> {login}</Fragment>}</li>
        <li>{company && <Fragment><strong>Company: </strong> {company}</Fragment>}</li>
        <li>{blog && <Fragment><strong>Website: </strong> {blog}</Fragment>}</li>
      </ul>
      <Repos repos={repos}/>
    </Fragment>
  )
}

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired
}

export default User
