import React from 'react'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'
import Users from '../Components/Users/Users'

function UsersPage() {
  return (
    <div>
      <NavBar/>
        <Users/>
        <Footer/>
    </div>
  )
}

export default UsersPage