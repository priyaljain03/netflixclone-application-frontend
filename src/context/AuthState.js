import React,{useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import AuthContext from "./AuthContext";

function AuthState(props) {
    const [authenticated,setAuthenticate] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        isAuthenticated()
    })

    const isAuthenticated = ()=>{
        let token = localStorage.getItem('access_token')
        if(token){
        const tokenParts = JSON.parse(atob(token.split('.')[1]));
        const now = Math.ceil(Date.now() / 1000);
            if(tokenParts.exp > now){
                setAuthenticate(true)
            }else{
                setAuthenticate(false)
                navigate('/logout')
            }
        }else{
            setAuthenticate(false)
        }
    }
    
  return (
    <AuthContext.Provider value={{authenticated, isAuthenticated }}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState