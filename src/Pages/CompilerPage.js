import React from 'react'
import Compiler from '../Components/Compiler/Compiler'
import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/NavBar/NavBar'

function CompilerPage() {
  return (
    <div>
        <NavBar/>
        <Compiler/>
        <Footer/>
    </div>
  )
}

export default CompilerPage