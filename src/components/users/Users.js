import React, { useContext } from 'react'
import UserItem from './UserItem'
// import Spinner from '../layout/Spinner'
// if(loading){
//   return <Spinner />
import GitHubContext from '../../context/github/githubContext'

const Users = () => {
  const githubContext = useContext(GitHubContext)
  const { loading, users } = githubContext
  return (
    <div className="mobile-grid">
    {users.map(user => (
      <UserItem key={user.id} user={user} />
    ))}
    </div>
  )
}

// In case we want to define some styles but not inline
const usersStyle = {
  width: '80%',
  margin: 'auto'
}

export default Users
