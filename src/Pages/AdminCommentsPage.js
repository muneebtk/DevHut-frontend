import React from 'react'
import AdminComments from '../Components/AdminComments/AdminComments'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function AdminCommentsPage() {
  return (
    <div>
        <NavBar/>
        <AdminComments/>
        <Footer/>
    </div>
  )
}

export default AdminCommentsPage