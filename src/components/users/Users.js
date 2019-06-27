import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GitHubContext from '../../context/github/githubContext'

const Users = () => {

  const githubContext = useContext(GitHubContext)
  const { loading, users } = githubContext

  if(loading){
    return <Spinner />
  } else {
    return (
      <div style={usersStyle}>
        {users.map(user => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    )
  }
}

// In case we want to define some styles but not inline
const usersStyle = {
  width: '80%',
  margin: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '1rem'
}

export default Users