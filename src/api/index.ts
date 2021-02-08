import axios from 'axios';

/**
 * axios instance
 */
let API = axios.create({
	baseURL: 'https://football-json.herokuapp.com',
	headers: { 'Content-Type': 'application/json' },
});

export { API };
