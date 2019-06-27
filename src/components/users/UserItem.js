import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// const UserItem = ({ user: { login, avatar_url, html_url }}) => {
const UserItem = (props) => {

  // destructure the properties from the 'user' prop that is passed in for cleaner and shorter code
  // Note above we could destructure directly in the function arguments (commented out)
  const { login, avatar_url, html_url, followers_url } = props.user

  return (

    <div className="card">
      <div class="card-image">
      </div>
      <div className="card-content">
      <div className="content has-text-centered">
        <figure class="image is-centered is-128x128">
          <img className="is-rounded" src={avatar_url} alt="Placeholder image"/>
        </figure>
          <p className="title is-4">{login}</p>
          <Link to={`/user/${login}`} className="button is-dark">See Profile</Link>
        </div>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
