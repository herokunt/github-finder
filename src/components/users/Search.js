import React, { Fragment, useState, useContext } from 'react'
import GitHubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {

  const githubContext = useContext(GitHubContext)
  const alertContext = useContext(AlertContext)
  const { loading, searchUsers, clearUsers } = githubContext
  const { setAlert } = alertContext

  const [text, setText] = useState('')

  const onChange = e => setText(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    if(text === ''){
      setAlert('Please enter a search value', 'alert')
    } else {
      searchUsers(text) // this fn comes as a 'prop' from App Component
      setText('')
    }
  }

  return (
    <Fragment>
      <div className="columns">
        <div className="column is-6 is-offset-3">
          <form className="field" onSubmit={onSubmit}>
            <div className="field">
              <div className="control">
                <input className="input mt-2" autofocus type="text" name="text" placeholder="Search Users..." value={text} onChange={onChange} />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className={loading ? 'button is-dark is-loading' : 'button is-dark'} type="submit">Search</button>
              </div>
              <div className="control">
                {githubContext.users.length > 0 && <button className={loading ? 'is-invisible' : 'button is-dark is-outlined'} onClick={clearUsers}>Clear</button>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Search
