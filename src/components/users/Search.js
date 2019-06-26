import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component{

  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  }

  // When we have forms with multiple inputs we can use e.target.name to grab the value from state, to which we know we want to update the value.
  // This also means our state will have different keys for text, email, password, etc... as requried.
  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    if(this.state.text === ''){
      this.props.setAlert('Please enter a search value', 'is-danger')
    } else {
      this.props.searchUsers(this.state.text) // this fn comes as a 'prop' from App Component
      this.setState({ text: '' })
    }
  }

  render(){
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.onChange} />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {this.props.showClear && <button value="Clear" className="btn btn-light btn-block" onClick={this.props.clearUsers}>Clear</button>}
      </div>
    )
  }
}

export default Search
