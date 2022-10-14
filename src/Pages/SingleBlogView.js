import React from 'react'
import BlogView from '../Components/BlogView/BlogView'
import Comment from '../Components/Comments/Comment'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function SingleBlogView() {
  return (
    <div>
      <NavBar/>
      <div className='singleBlogCard' sx={{margin:'auto'}}>
        <BlogView/>
        <Comment/>
        <Footer/>
        </div>
    </div>
  )
}

export default SingleBlogView