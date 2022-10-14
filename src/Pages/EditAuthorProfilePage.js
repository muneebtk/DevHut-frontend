import React from 'react'
import EditAuthorProfile from '../Components/EditAuthorProfile/EditAuthorProfile'
import Footer from '../Components/Footer/Footer';
import NavBar from '../Components/NavBar/NavBar';

function EditAuthorProfilePage() {
  return (
    <div>
      <NavBar/>
        <EditAuthorProfile/>
        <Footer/>
    </div>
  )
}

export default EditAuthorProfilePage