import React from 'react'
import CategoryBlogs from '../Components/CategoryBlogs/CategoryBlogs'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function CategoryPage() {
  return (
    <div>
        <NavBar/>
        <CategoryBlogs/>
        <Footer/>
    </div>
  )
}

export default CategoryPage