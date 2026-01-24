import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const testApi = async () => {
	const res = await api.get('/api/test');
	return res.data;
};
