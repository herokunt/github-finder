import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="navbar bg-primary">
      <h1><i className={ props.icon }/> { props.title} </h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </nav>
  )
}

// If no props are passed from App.js these will be used
Navbar.defaultProps = {
  title: 'You are seeing the default Prop Title',
  icon: 'fab fa-github'
}

// Type checking to help avoid errors passing props to this component
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

export default Navbar
