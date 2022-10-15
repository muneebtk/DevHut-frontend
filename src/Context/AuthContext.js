import {createContext,useState} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from '../Utils/axios'
import { applyAuthTokenInterceptor } from 'axios-jwt';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{

    let [user,setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let navigate = useNavigate();
    let [phone,setPhone] = useState();
    let [resData,setResData] = useState()
    let [resetPasswordResponseData,setResetPasswordResponseData] = useState()
    let [otpResSuccess,setOtpResSuccess] = useState()
    let [otpResError,setOtpResError] = useState()

    let [signupResError,setSignupResError] = useState()
    let [signupResSuccess,setSignupResSuccess]= useState()
    let [loading,setLoading] = useState()
   

    const BASE_URL = 'http://13.233.6.228/'
    const axiosInstance = axios.create({ baseURL: BASE_URL })

    const requestRefresh = async (refresh) => {
        return axios.post(`${BASE_URL}/api/token/refresh/b`, { refresh })
        .then((response) => 
        localStorage.setItem('authTokens',JSON.stringify(response.data.access_token)))
    };
   
    applyAuthTokenInterceptor(axiosInstance, { requestRefresh });  // Notice that this uses the axiosInstance instance.  <-- important


    let loginUser = async (email,password) =>{
        setLoading(true)
        let response = await fetch('http://127.0.0.1:8000/user/login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':email,'password':password})
        })
        let data = await response.json()
        if (response.status === 200){
            setLoading(false)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate(-1)
        }else{
            setLoading(false)
            setResData('Invalid password or There is no account existing for this email.')
            
        }
    }
    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setUser(null)
        navigate('/')
        
    }
    let SignupUser = async(firstName,lastName,email,phoneNumber,password,confirmPassword)=>{
        setPhone(phoneNumber)
        await axios.post('user/signup/',{first_name:firstName,
            last_name:lastName,
            email:email,
            phone_number:phoneNumber,
            password:password,
            confirm_password:confirmPassword}).then((response)=>{
                if (response.status===200){
                    setPhone(response.data.phone_number)
                    setSignupResSuccess('User registered successfully, Please verify with OTP')
                    navigate('/user/otp_verification')             
                }else{
                    setSignupResError(response.data)
                  
                }
            })
    }

    let VerifyUser = async(otp)=>{
        await axios.post('user/verify/',{
            code:otp,
            phone_number:phone,
        }).then((response)=>{
            if (response.status===200){
                setOtpResSuccess(response.data.success)
                navigate('/user/login/')
            }else{
                setOtpResError(response.data.error)
            }
        })
    }
   

    let resetPasswordResponse=(data)=>{
       setResetPasswordResponseData(data)
    }

    let contextData = {
        loginUser:loginUser,
        user:user,
        authTokens:authTokens,
        logoutUser:logoutUser,
        SignupUser:SignupUser,
        VerifyUser:VerifyUser,
        resData:resData,
        signupResSuccess:signupResSuccess,
        resetPasswordResponseData:resetPasswordResponseData,
        resetPasswordResponse:resetPasswordResponse,
        otpResSuccess:otpResSuccess,
        otpResError:otpResError,
        signupResError:signupResError,
        loading:loading,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}