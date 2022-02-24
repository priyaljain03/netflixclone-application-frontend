import React, { useEffect, useState } from 'react';
import '../css/Row.css'
import { axiosInstance } from '../axios';
import { useNavigate } from 'react-router-dom';

const base_url = "http://localhost:8000"

function Row(props) {
    const [movies, setMovies] = useState([])
    const { isLargeRow, title, genre, isNetflixOriginals, profileId } = props
    const navigate = useNavigate()

    useEffect(() => {
            if(profileId==""){
                navigate('/profiles')
            }else{
                axiosInstance.get(`movies/?genre=${genre}&isNetflixOriginals=${isNetflixOriginals}`,{
                    params:{
                        profileId:profileId
                    }
                })
                .then((res => {
                    setMovies(res.data)
                })).catch(err => {
                    console.log(err.message)
                    console.log("No movies presenrt")
                })
            }
    }, [])

    return <div className="row">
        <h4>{title}</h4>
        <div className={`row__posters${props.isLargeRow ? "__Large" : ""}`}>
            {movies.map((movie) => {
                return <img key={movie.id} onClick={() => navigate('/detail', { state: movie })} src={`${base_url}${movie.flyer}`} alt={movie.title}></img>
            })}
        </div>
    </div>;
}

export default Row;
