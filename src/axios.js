import axios from "axios";
import Logout from "./components/Logout";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
})

const baseurl = "https://netflixclone-backend.herokuapp.com/api/"
const axiosInstance = axios.create({
    baseURL:"https://netflixclone-backend.herokuapp.com/api/",
    timeout:1000,
    headers:{
        Authorization:localStorage.getItem('access_token')
        ? 'JWT ' + localStorage.getItem('access_token')
        : null,
        'Content-Type': 'application/json',
        accept:'application/json'
    },
	data:{}
})


export {
   instance,axiosInstance}
