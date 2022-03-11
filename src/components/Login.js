import React, { useState,useContext } from 'react';
import { useNavigate, Link } from "react-router-dom"
import '../css/Login.css'
import Footer from './Footer'
import { axiosInstance } from '../axios';
import AuthContext from '../context/AuthContext';

function Login() {
    const context = useContext(AuthContext)
    const {authenticated,isAuthenticated} = context
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [errors, setErrors] = useState({ emailError: "", passwordError: "" ,otherErrors:""})
    const navigate = useNavigate()

    const handleValidate = () => {
        let errorsArray = {emailError: "", passwordError: "",otherErrors:""}
        if (credentials.password.length < 4 || credentials.password.length > 60) {
            errorsArray.passwordError = "Your password must contain between 4 and 60 characters."
        }
        if (credentials.email.length <= 0) {
            errorsArray.emailError = "Please enter a valid email address."
        }

        if (errorsArray.emailError != "" || errorsArray.passwordError != "") {
            setErrors(errorsArray)
            return false
        } else {
            return true
        }

    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (handleValidate()) {
            axiosInstance.post(`token/`,{
                email:credentials.email,
                password:credentials.password
            })
            .then((res=>{
                if(res.data){
                    localStorage.setItem('access_token', res.data.access)
                    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
                    isAuthenticated()
                    navigate('/profiles')
                    
                }
            })).catch(err=>{
                setErrors({...errors,otherErrors:"Sorry, we can't find an account with this email address. Please try again or create a new account."})
            })
    }

    }
    return (
        <div className="login">
            <div className="login__header">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" />
            </div>
         
            <div className="login__box__wrapper">
            
                <div className="login__content">
                    <h4 style={{ color: 'white' }}>Sign In</h4>
                    {errors.otherErrors !="" ? <div className="error__box">
                   {errors.otherErrors}
                  </div> : ""}
                    <form className="login__form" onSubmit={handleSubmit}>
                        <input name="email" type="email" autoComplete='off' placeholder="Email" onChange={handleChange} className={errors.passwordError !== "" ? "error__boundary" : ""} />
                        {errors.emailError !== "" ? <p className="error__text">{errors.emailError}</p> : ""}

                        <input className={errors.passwordError !== "" ? "error__boundary" : ""} name="password" type="password" placeholder="Password" onChange={handleChange} />
                        {errors.passwordError !== "" ? <p className="error__text">{errors.passwordError}</p> : ""}

                        <button >Sign In</button>
                    </form>
                    <span style={{ color: 'gray', fontSize: '12px' }}>New to Netflix? <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Sign up now</Link>.</span>
                    <br />
                    <p style={{ color: 'gray', fontSize: '10px' }}>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="" style={{ textDecoration: 'none', color: 'blue' }}>Learn more.</a></p>
                </div>
            </div>
            <Footer backColor="black" />
        </div >
    )
}

export default Login;