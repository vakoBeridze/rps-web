import axios from "axios";

const devApiHost = process.env.REACT_APP_API_HOST || 'http://localhost:8080';

const API = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? devApiHost : '/api'
});

API.defaults.timeout = 10000;

export default API;
