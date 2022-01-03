import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res = {data: {}}) => {
    return Promise.resolve(res.data)
  },
  (err = {}) => {
    const { data = {}} = err.response
    let errorMessage = data.message
    return Promise.reject(errorMessage || 'error, pelease try again.')
  }
)
export default axios;
