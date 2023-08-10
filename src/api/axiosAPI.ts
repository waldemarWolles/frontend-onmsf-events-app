import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:2222',
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`

  return config
})

export default instance
