import React, { useState,useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logout from "./Logout"
import '../css/Home.css';
import AuthContext from '../context/AuthContext';


function Home() {
    const [state, setState] = useState('')
    const [error, setError] = useState('')
    const context = useContext(AuthContext)
    const {authenticated,isAuthenticated} = context
    const navigate = useNavigate()

    const handleValidate = () => {
        if (state.length <= 0) {
            setError("Email is required")
            return false
        }
        return true
    }

    const handleChange = (e) => {
        setState(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidate()) {
            navigate('/signup', { state })
}
    }

    return (

        <div className="home">
            <div className="home__topwrapper ">
                <div className=""></div>
                <div className="home__header fadeTop">
                    <img className="home__logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>
                    {localStorage.getItem('access_token')?<Link to="/logout" className="home__login" >Logout</Link>:<Link to="/login" className="home__login" >Sign In</Link>}
                </div>
                <div className="home__contents fadeBottom__class">
                    <h1>Unlimited movies, TV <br />shows and more.</h1>
                    <h4>Watch anywhere. Cancel anytime.</h4>
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email address" name="email" onChange={handleChange}></input>
                        <button >Get Started</button>
                    </form>
                    <div  style={{ textAlign: 'center',marginTop:'1%',marginLeft:"1%" }}>
                        {error.length > 0 ? <span style={{ color: 'orange' }}>{error}</span> : ''}
                    </div>
                
                </ div>
               
            </div >
           
        </div >
    )
}

export default Home