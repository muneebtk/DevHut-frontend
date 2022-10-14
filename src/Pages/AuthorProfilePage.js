import React from 'react'
import AuthorBlogs from '../Components/AuthorBlogs/AuthorBlogs'
import AuthorProfile from '../Components/AuthorProfile/AuthorProfile'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function AuthorProfilePage() {
  return (
    <div>
      <NavBar/>
      <div style={{display:'flex'}}>
        <AuthorProfile/>
        <AuthorBlogs/>
      </div>
      <Footer/>
    </div>
  )
}

export default AuthorProfilePage