import axios from "axios";
const API = axios.create({
    baseURL:"http://localhost:3635",
    withCredentials:true
})
export default API