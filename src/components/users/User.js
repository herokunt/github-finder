import React, { Fragment, Component } from 'react'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class User extends Component {
  // NOTE: again, the props that were passed come from Route and gives us access to match.params
  componentDidMount(){
    this.props.getUser(this.props.match.params.login)
    this.props.getUserRepos(this.props.match.params.login)
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
  }

  // The getUser method returns a user object that is passed in when state is changed.
  // This user obj comes from GitHub and has a bunch of data, as below:
  render(){
    const { name, avatar_url, location, bio, blog, company, login, html_url, followers, following, public_repos, public_gists, hireable } = this.props.user
    const { loading } = this.props

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
        <Repos repos={this.props.repos}/>
      </Fragment>
    )
  }

}

export default User
