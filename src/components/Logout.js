import React,{useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import {axiosInstance} from "../axios"

function Logout() {
    const navigate = useNavigate()
    useEffect(()=>{
        localStorage.removeItem('access_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        navigate('/login')
    },[])

    return <div></div>;
}

export default Logout;
