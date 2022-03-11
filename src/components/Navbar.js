import React, { useState, useEffect } from 'react'
import '../css/Navbar.css'
import { Link } from "react-router-dom";
import { axiosInstance } from '../axios';

const base_url = "https://image.tmdb.org/t/p/w500/"
const baseImgUrl = 'https://netflixclone-backend.herokuapp.com'
function Navbar() {

    const [show, handleShow] = useState(false);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        axiosInstance.get(`user/profiles/`)
        .then(res=>{
            setProfiles(res.data)
        })

        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else {
                handleShow(false)
            }
        });
        return () => {
            // window.removeEventListener("scroll")
        }
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div>
            <img className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>
            </div>
            
            {/* <div className="right__items"> */}
                
                
                <div className="dropdown">
                
                    <Link to="/profiles" className="dropbtn"><img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"></img></Link>
                </div>
            {/* </div> */}
        </div >
    )
}

export default Navbar
