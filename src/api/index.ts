import axios from 'axios';

/**
 * axios instance
 */
let API = axios.create({
	baseURL: 'http://localhost:8000',
	headers: { 'Content-Type': 'application/json' },
});

export { API };
