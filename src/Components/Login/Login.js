import React,{useContext, useState} from 'react'
import {Grid,Paper,Avatar,Typography
,TextField,Button, Alert, LinearProgress, Box
} from '@mui/material'
import './login.css'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { green } from '@mui/material/colors';
import {Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';


function Login() {
  let {loginUser,resData} = useContext(AuthContext)
  let [email,setEmail] = useState(null)
  let [password,setPassword] = useState(null)
  let [emailError,setEmailError] = useState('')
  let [passwordError,setPasswordError] = useState()

  let {resetPasswordResponseData,otpResSuccess,loading} = useContext(AuthContext);

  const emailValidation = ()=>{
    
    const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
   
    if (regEx.test(email)){
      
      {password?loginUser(email,password):setPasswordError('Please enter your password')}
      }else if (!regEx.test(email) && email !==''){
        setEmailError('Plese enter a valid email')
      }else{
        setPasswordError('The field in empty')
      }
  }

  const handleEmail = (e)=>{
    e.preventDefault()
    setEmail(e.target.value)
    
  }
  const handlePassword = (e)=>{
    e.preventDefault()
    setPassword(e.target.value)
  }
  
  return (
    <div>
      <Grid>
      
        <Paper elevation={5} className='paper'>
        {loading?
        <Box sx={{ width: '100%' ,marginTop:'0%'}} >
          <LinearProgress />
        </Box>
        :null}
          <Grid align='center' className='grid'>
          <Avatar sx={{ bgcolor: green[500] }}>
            <LockPersonOutlinedIcon/>
          </Avatar >
              <Typography variant='h4' className='typo'>Signin</Typography>
          </Grid>
          <Grid >
          {resData?<Alert severity='error'>{resData}</Alert>:null}
          {resetPasswordResponseData?<Alert severity='success'>{resetPasswordResponseData}</Alert>:null}

          {otpResSuccess?<Alert severity='success'>{otpResSuccess}</Alert>:null}

            <form onSubmit={emailValidation} noValidate>
              
            {emailError ?
            <div><TextField style={{marginTop:'55px'}}
            onChange={handleEmail}
            variant='standard' name="email" error type='email' label='Email' placeholder='Enter Email' fullWidth={true} ></TextField>
            <Typography variant='caption' style={{color:'red'}}>{emailError}</Typography> 
            </div>:
            <div>
            <TextField style={{marginTop:'10px'}}
            onChange={handleEmail}
            variant='standard' name="email" type='email' label='Email' placeholder='Enter Email' fullWidth={true} ></TextField>  
            </div>
            }
          
            {passwordError?
            <div><TextField error onChange={handlePassword} name="password" style={{marginTop:'10px'}} 
            variant='standard' type='password' label='Password' placeholder='Enter Password' fullWidth='true' ></TextField>
            <Typography variant='caption' style={{color:'red'}}>{passwordError}</Typography>
            </div>:
            <div><TextField  onChange={handlePassword} name="password" style={{marginTop:'10px'}} 
            variant='standard' type='password' label='Password' placeholder='Enter Password' fullWidth='true' ></TextField>
            </div>}

            <Typography style={{textAlign:'right',marginTop:'10px'}} variant='body2'><Link to='/user/forgot_password' style={{textDecoration:'none',color:'#0033cc'}}>Forgot password?</Link></Typography>

            <Button style={{marginTop:'20px'}} fullWidth={true} className='button1' onClick={emailValidation} variant='outlined'>Login</Button><br /><br />

            <Typography variant='body2'>Dont have an account?<Link style={{marginTop:'30px',color:'#0033cc',textDecoration:'none'}} to='/user/signup'>Signup</Link></Typography>
            </form> 
          </Grid> 
        </Paper>
      </Grid>
    </div>
  )
}

export default Login