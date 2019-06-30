import React, { useContext } from 'react'
import UserItem from './UserItem'
// import Spinner from '../layout/Spinner'
// if(loading){
//   return <Spinner />
import GitHubContext from '../../context/github/githubContext'

const Users = () => {
  const githubContext = useContext(GitHubContext)
  const { users, resultsPerPage, currentPage, paginate } = githubContext

  let pageNumbers = []

  for(let i = 1; i <= Math.ceil(users.length / resultsPerPage); i++){
    pageNumbers.push(i)
  }

  const indexOfLastUser = currentPage * resultsPerPage
  const indexOfFirstUser = indexOfLastUser - resultsPerPage

  // Do not confuse slice with splice!!
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div>
      <div className="mobile-grid">
      {currentUsers.map(user =>
        <UserItem key={user.id} user={user} />
      )}
      </div>
      <nav className="pagination is-centered my-2">
        <ul className="pagination-list">
          {pageNumbers.map(page => {
            return <li key={page}><button onClick={() => paginate(page)} className={currentPage === page ? "pagination-link is-current" : "pagination-link"}>{page}</button></li>
          })}
        </ul>
      </nav>)
    </div>
  )
}

export default Users
