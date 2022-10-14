import { Typography } from '@mui/material'
import React from 'react'
import './header.css'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';


function Header() {
  return (
    <div>
        <header className='header'>
            <Typography variant='h5'>Inc. This Morning</Typography>
            <Typography variant='h4'>" Blogs "</Typography>
            <Typography className='description' variant='body2'>Awesome place to make oneself<br/>
            productive and entertained through daily updates.</Typography>
            
          </header>
    </div>
  )
}

export default Header