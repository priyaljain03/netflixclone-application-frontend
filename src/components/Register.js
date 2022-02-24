import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/Register.css'
import Footer from './Footer'

function Register() {
    const { state } = useLocation()
    const [credentials, setCredentials] = useState({ email: state, password: "", first_name: "", last_name: "", user_name: "" });
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const isError = () => {
        let errorsArray = []
        if (credentials.password.length <= 0) {
            errorsArray.push("Your password must contain between 4 and 60 characters.")
        }
        if (credentials.user_name.length <= 0) {
            errorsArray.push("Your username cannot be blank.")
        }
        if (credentials.first_name.length <= 0) {
            errorsArray.push("Your first name cannot be blank.")
        }

        if (errorsArray.length > 0) {
            setErrors(errorsArray)
            return true
        } else {
            return false
        }
    }


    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isError() === false) {

            const response = await fetch("http://localhost:8000/api/user/register/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...credentials })
            }).then((resp) => {
                return resp.json()
            }).then((res) => {
                navigate('/login')
            }).catch(err => {
                console.log("Error", err)
            })
        }
    }

    return (
        <div className="signup__wrapper">

            <div className="signup__header">
                <img className="signup__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png" />
                <a className="signup__signin" href="/login">Sign in</a>
            </div>
            <hr />

            <div className="signup__form">
                {errors.length > 0 ? <div className="error__box">
                    <ul>
                        {errors.map(error => <li>{error}</li>)}
                    </ul>
                </div> : ""}

                <h2>Welcome back!</h2>
                <h2>Joining Netflix is easy.</h2>
                <p>Enter your details and you'll be watching in no time.</p>
                <label htmlFor="email">Email</label><br />
                <p name="email" style={{ marginLeft: '0px', marginBottom: "30px", marginTop: "0px", fontWeight: '700', fontSize: '13px' }} >{credentials.email} </p>
                <form className="signup__box" onSubmit={handleSubmit}>
                    <input autoComplete="off" type="text" placeholder="Username" name="user_name" value={credentials.user_name} onChange={handleChange} />
                    <input autoComplete="off" type="text" placeholder="First Name" name="first_name" value={credentials.first_name} onChange={handleChange} />
                    <input autoComplete="off" type="text" placeholder="Last Name" name="last_name" value={credentials.last_name} onChange={handleChange} />
                    <input autoComplete="off" type="password" placeholder="Password" name="password" value={credentials.password} onChange={handleChange} />
                    <button type="submit">Register</button>
                </form>
            </div>
            <Footer backColor="#F3F3F3" />
        </div >);
}

export default Register;