import React from 'react'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'
import SearchResult from '../Components/SearchResult/SearchResult'

function SearchResultPage() {
  return (
    <div>
      <NavBar/>
        <SearchResult/>
        <Footer/>
    </div>
  )
}

export default SearchResultPage