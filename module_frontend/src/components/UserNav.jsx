import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../pages/Auth/AuthContext'

function UserNav() {
    const {user} = useAuth()

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
    <div className="container">
      <a className="navbar-brand" href="/">Gaming Portal</a>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
      <li><Link to='/DiscoverGames' className="nav-link px-2 text-white">Discover Games</Link></li>
      <li><Link to='/ManageGames' className="nav-link px-2 text-white">Manage Games</Link></li>
      <li><Link to='/Profile' className="nav-link px-2 text-white">User Profile</Link></li>
      {user ? (
        <>
      <li className="nav-item">
        <a className="nav-link active bg-dark" href="#">Welcome, {user.username}</a>
      </li> 
      <li className="nav-item">
        <Link to='/auth/signin' className="btn bg-white text-primary ms-4" >Sign Out</Link>
      </li>
          </>
            ) : (
            <li className="nav-item">
              <Link to="/auth/signin">
                <button className="btn bg-white text-primary ms-4">Login</button>
              </Link>
            </li>
            )}
      
    </ul> 
    </div>
    </nav>
  )
}

export default UserNav