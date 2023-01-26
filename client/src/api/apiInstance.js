import axios from 'axios';
import { json } from 'react-router-dom';

const apiInstance = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});

apiInstance.interceptors.response.use((res) => {
  return res.data;
});

apiInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('persist:auth'));

  const { token } = user;

  config.headers = {
    Authorization: JSON.parse(token),

    ContentType: 'application/json',
  };
  return config;
});
export default apiInstance;
