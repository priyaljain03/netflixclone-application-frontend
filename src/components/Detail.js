import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import {useLocation,Link,useNavigate} from 'react-router-dom'
import '../css/Details.css'
import { axiosInstance } from '../axios';

const baseURL = "https://netflixclone-backend.herokuapp.com"

function Detail(props) {
    const [movie,setMovie] = useState({})
    const [videos,setVideos] = useState([])
    const {state} = useLocation()

    useEffect(()=>{
        axiosInstance.get(`movie/${state.id}`)
        .then(res=>{
            setMovie(res.data.movie)
            setVideos(res.data.videos)
        })
        .catch(err=>{
            
        })
    },[])


    return (<div className="wrapper" >
        <div className="banner" style={{background:`url("${movie.flyer}")`,backgroundSize:'cover'}}>
        <Navbar />
        <div className="banner__content">
            <h1 className="banner__title">{movie.title}</h1>
            <p className="banner__description">{movie.description}</p>
            <div className="detail__buttons">
            <button className="button1" >Play</button>
            <button className="button2">Watch Trailer</button>
        </div>
        </div>
        <div className="fadeLast"></div>
        </div>
  
        <div className="videos">
            <h3>Episodes</h3>
            {videos.map(video=>{
                return <div className="episode__box">
                    <Link to="/play" state={{ src: `${video.videofile}`}}><img src={`${movie.flyer}`} /></Link>
                    <div className="episode__about">
                        <span>{video.title}</span>
                       <p>{video.description}</p>
                    </div>
                </div>
            })}
        </div>
    </div>)
}

export default Detail;
