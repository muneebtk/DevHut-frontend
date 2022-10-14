import React from 'react'
import AdminBlogList from '../Components/AdminBlogsList/AdminBlogList'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function AdminBlogsListPage() {
  return (
    <div>
        <NavBar/>
        <AdminBlogList/>
        <Footer/>
    </div>
  )
}

export default AdminBlogsListPage