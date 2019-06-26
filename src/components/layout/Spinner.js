import React, { Fragment } from 'react'
import spinner from './spinner.gif'

// We don't need to use return because this is an arrow function
// Also, we are using a Fragment here because we don't want the output html to actually render a div around the spinner
const Spinner = () =>
  <Fragment>
    <img src={spinner} alt="Loading..." style={{ width: '200px', margin: 'auto', display: 'block' }} />
  </Fragment>

export default Spinner
