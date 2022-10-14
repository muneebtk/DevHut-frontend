import React from 'react'
import AdminHom from '../Components/AdminHome/AdminHom'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function AdminHomePage() {
  return (
    <div>
      <NavBar/>
        <AdminHom/>
        <Footer/>
    </div>
  )
}

export default AdminHomePage