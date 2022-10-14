import React,{useContext, useState} from 'react'
import {Grid,Paper,Avatar,Typography
,TextField,Button, Alert
} from '@mui/material'
import './resetPassword.css'
import axios from 'axios';
import AuthContext from '../../Context/AuthContext';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { blue } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  let {resetPasswordResponse} = useContext(AuthContext);
  let [resSuccess,setResSuccess] = useState()
  let [resError,setResError] = useState()
  let navigate = useNavigate()
  
  let params=useParams()
  // console.log(params,'parms');
  let mg=params.mg
  let token = params.token

  let resetPassword = async(e)=>{
    e.preventDefault()
    await axios.post(`http://127.0.0.1:8000/user/reset_password/${mg}/${token}/`,{
        password:e.target.password.value,
        confirm_password:e.target.confirm_password.value,
    }).then((response)=>{
      if (response.status===200){

        setResSuccess(response.data)
        resetPasswordResponse(response.data.success)

        navigate('/user/login')
      }else{
        setResError(response.data)
      }
    })
}

  

  return (
    <div>
        <Grid>
        <Paper elevation={5} className='paper_reset'>
         
          <Grid align='center' className='grid_reset'>
          <Avatar sx={{ bgcolor: blue[700] }}>
            <VpnKeyOutlinedIcon/>
          </Avatar >
              <Typography variant='h4' className='typo_reset'>Reset Password</Typography>
          </Grid>
          <Grid >
            
            {resError?<Alert severity='error'>{resError.error}</Alert>:null}
            <form onSubmit={resetPassword}>
          <TextField name='password' style={{marginTop:'10px'}} variant='standard' type='password' label='Password' placeholder='Enter Password' fullWidth='true' ></TextField>
          <TextField name='confirm_password' style={{marginTop:'10px'}} variant='standard' type='Password' label='Confirm Password' placeholder='Confirm Password' fullWidth='true' ></TextField>

          <Button type='submit' style={{marginTop:'20px'}} fullWidth='true' className='button1' variant='outlined'>submit</Button><br /><br />
          </form>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}
// export const params=params

export default ResetPassword
