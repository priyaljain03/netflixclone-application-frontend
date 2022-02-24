import React, { useEffect, useState } from 'react';
import Navbar from './Navbar'
import {useLocation,Link,useNavigate} from 'react-router-dom'
import '../css/Details.css'
import { axiosInstance } from '../axios';

const baseURL = "http://localhost:8000"

function Detail(props) {
    const [movie,setMovie] = useState({})
    const [videos,setVideos] = useState([])
    const {state} = useLocation()

    useEffect(()=>{
        axiosInstance.get(`movie/${state.id}`)
        .then(res=>{
            console.log("Data",res.data)
            console.log("Data1",res.data.movie)
            console.log("Data2",res.data.videos)
            setMovie(res.data.movie)
            setVideos(res.data.videos)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])


    return (<div className="wrapper" >
        <div className="banner" style={{background:`url("http://localhost:8000${movie.flyer}")`,backgroundSize:'cover'}}>
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
                    <Link to="/play" state={{ src: `${baseURL}${video.videofile}`}}><img src={`http://localhost:8000${movie.flyer}`} /></Link>
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
