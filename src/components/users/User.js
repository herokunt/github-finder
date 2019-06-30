import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { Link } from 'react-router-dom'
import GitHubContext from '../../context/github/githubContext'

const User = ({ match }) => {

  const { getUser, loading, user, getUserRepos, repos } = useContext(GitHubContext)

  useEffect(() => {
    getUser(match.params.login)
    getUserRepos(match.params.login)
    // eslint-disable-next-line
  }, [])

  const { name, avatar_url, location, bio, blog, company, login, html_url, followers_url, following_url, repos_url, gists_url, hireable } = user

  if (loading) return <Spinner />

  return (
    <div className="container">
      <Link to='/' className="button is-light my-2"><span className="icon is-small"><i className="fas fa-arrow-left"></i></span><span>Back to Results</span></Link>
      <div className="tile is-ancestor">
        <div className="tile is-parent is-3">
          <div className="tile is-child">
            <img src={avatar_url} alt=""/>
          </div>
        </div>
        <div className="tile is-parent is-3">
          <div className="tile is-child box">
            <h1 className="title is-size-5">{name}</h1>
            <h2 className="subtitle">{location}</h2>
            <ul>
              <strong>Hireable:</strong>
              {hireable ? (<span className="icon has-text-success"><i className="fas fa-check"></i></span>) : (<span className="icon has-text-danger"><i className="fas fa-ban"></i></span>)}
              <li>{login && <Fragment><strong>Username: </strong> {login}</Fragment>}</li>
              <li>{company && <Fragment><strong>Company: </strong> {company}</Fragment>}</li>
              <li>{blog && <Fragment><strong>Website: </strong> {blog}</Fragment>}</li>
            </ul>
            <div className="has-text-centered">
              <a href={html_url} className="button is-dark mt-2">Visit Profile</a>
            </div>
          </div>
        </div>
        <div className="tile is-parent is-6">
          <div className="tile is-child">
            <div className="tile is-child notification fullheight">
            {bio && (
              <Fragment>
              <h2 className="is-size-4 is-left">Bio</h2>
              <p>{bio}</p>
              </Fragment>
            )}
            </div>
          </div>
        </div>
      </div>
      <div className="level">
        <div className="level-left">
          <div className="level-item has-text-centered">
            <a className="button is-small is-primary" href={followers_url}>Followers</a>
          </div>
          <div className="level-item has-text-centered">
            <a className="button is-small is-info" href={following_url}>Following</a>
          </div>
          <div className="level-item has-text-centered">
            <a className="button is-small is-link" href={repos_url}>Repos</a>
          </div>
          <div className="level-item has-text-centered">
            <a className="button is-small is-success" href={gists_url}>Gists</a>
          </div>
        </div>
      </div>
      <Repos repos={repos}/>
    </div>
  )
}

export default User
