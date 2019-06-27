import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-menu">
          <div className="navbar-start">
            <i className={ `${props.icon} navbar-item` } />
            <h1 className="navbar-item">{ props.title }</h1>
          </div>
          <div className="navbar-end">
            <ul className="navbar-item">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}


// If no props are passed from App.js these will be used.
// After refactoring to Context passing props down from App is not really useful anymore,
// but I keep this around just to show that we could use them.
  Navbar.defaultProps = {
    title: 'GitHub User Finder',
    icon: 'fab fa-github fa-2x'
  }

/*
Type checking to help avoid errors passing props to this component
  Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }
*/

export default Navbar
