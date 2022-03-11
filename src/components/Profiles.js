import React, { useEffect,useState,useContext} from 'react';
import { axiosInstance } from '../axios';
import {Link} from "react-router-dom"
import '../css/Profiles.css';
import ProfileBox from "./ProfileBox";

function Profiles() {
    const [profiles,setprofiles] = useState([])
    const [showEditButton,setEdit] = useState(false)

    useEffect(()=>{
        axiosInstance.get(`user/profiles/`)
        .then(res=>{
            setprofiles(res.data)
        })
    },[])

    const handleEditProfileButton = ()=>{
        setEdit(true)
    }

    return (
    <div className="profiles">
        <div className="header">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"></img>
            <Link to="/logout" className="home__logout" >Logout</Link>
        </div>
        <div className="profiles__body">
            <h1>Who's Watching ?</h1>
            <div className="profiles__list">
               
                {profiles.map(profile=>{
                    return <ProfileBox id={profile.id} key={profile.id} type="profile" title={profile.name} editable={showEditButton} image={profile.image} link="/browse"/>
                })}
               
               {profiles.length <4?<ProfileBox type="addProfile"  link="/createprofile"/>:""}
               
            </div>
            <button className="manage__btn" onClick={handleEditProfileButton}>Manage Profiles</button>
        </div>
    </div>
  );
}

export default Profiles;
