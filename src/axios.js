import axios from "axios";
import Logout from "./components/Logout";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
})

const baseurl = "http://127.0.0.1:8000/api/"
const axiosInstance = axios.create({
    baseURL:"http://127.0.0.1:8000/api/",
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

// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async function (error) {
// 		const originalRequest = error.config;

// 		if (typeof error.response === 'undefined') {
// 			alert(
// 				'A server/network error occurred. ' +
// 					'Looks like CORS might be the problem. ' +
// 					'Sorry about this - we will get it fixed shortly.'
// 			);
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.status === 401 &&
// 			originalRequest.url === baseurl + 'token/refresh/'
// 		) {
// 			window.location.href = '/login/';
// 			return Promise.reject(error);
// 		}

// 		if (
// 			error.response.data.code === 'token_not_valid' &&
// 			error.response.status === 401 &&
// 			error.response.statusText === 'Unauthorized'
// 		) {
// 			const refreshToken = localStorage.getItem('refresh_token');
// 			console.log("I am here")
// 			console.log(refreshToken)
// 			if (refreshToken!=='undefined') {
// 				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

// 				// exp date in token is expressed in seconds, while now() returns milliseconds:
// 				const now = Math.ceil(Date.now() / 1000);
// 				console.log("Expiry time",tokenParts.exp);
// 				console.log("Expiry time Now",now);

// 				if (tokenParts.exp > now) {
// 					return axiosInstance
// 						.post('/token/refresh/', { refresh: refreshToken })
// 						.then((response) => {
// 							localStorage.setItem('access_token', response.data.access);
// 							localStorage.setItem('refresh_token', response.data.refresh);

// 							axiosInstance.defaults.headers['Authorization'] =
// 								'JWT ' + response.data.access;
// 							originalRequest.headers['Authorization'] =
// 								'JWT ' + response.data.access;

// 							return axiosInstance(originalRequest);
// 						})
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 				} else {
// 					console.log('Refresh token is expired', tokenParts.exp, now);
// 					const response = axiosInstance.post("user/logout/blacklist/",{
// 						refresh_token : localStorage.getItem('refresh_token')
// 					});
// 					localStorage.removeItem('access_token');
// 					localStorage.removeItem('refresh_token');
// 					axiosInstance.defaults.headers['Authorization'] = null;
// 					window.location.href = '/login/';
// 				}
// 			} else {
// 				console.log('Refresh token not available.');
// 				localStorage.removeItem('access_token');
// 				localStorage.removeItem('refresh_token');
// 				axiosInstance.defaults.headers['Authorization'] = null;
// 				window.location.href = '/login/';
// 			}
// 		}

// 		// specific error handling done elsewhere
// 		return Promise.reject(error);
// 	}
// );


export {
   instance,axiosInstance}
