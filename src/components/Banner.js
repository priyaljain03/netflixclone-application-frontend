import React, { useEffect, useState } from 'react';
import requests from '../requests'
import "../css/Banner.css"
import {instance} from '../axios';
import {Link} from "react-router-dom"



function Banner() {
    const [movie, setMovie] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(requests.fetchTrending)
            setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length - 1)])
        }
        fetchData()
    }, [])

    function truncate(str, n) {
        return str?.length > n ? (str.substr(0, n - 1) + "...") : str
    }

    return (
        <div className="banner__wrapper" style={{ backgroundImage: ` url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` }}>
             
            <div className="banner__content">
                <div className="banner__title">
                    {movie.title?movie.title:""}
                </div>
                <div className="banner__description">
                    {truncate(movie.overview, 200)}
                </div>
                <div className="banner__buttons">
                    <button className="button1"><Link to='/play' state={{ src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}}>Play</Link></button>
                    <button className="button2">More Info</button>
                </div>

            </div>
           
            <div className="fadeBottom">
                
            </div>
        </div>
    )
}

export default Banner;