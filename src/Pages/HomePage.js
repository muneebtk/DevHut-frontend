import React from 'react'
import Home from '../Components/Home/Home'
import Header from '../Components/Header/Header'
import NavBar from '../Components/NavBar/NavBar'
import CategoryBlogs from '../Components/BlogsCategory/BlogCategory'
import Blogs from '../Components/Blogs/Blogs'
import Footer from '../Components/Footer/Footer'

function HomePage() {
  return (
    <div>
        <NavBar/>
        <Header/>
        <Home/>
        <CategoryBlogs/>
        <Blogs/>
        <Footer/>
    </div>
  )
}

export default HomePage