import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 10080
  // headers: { 'Content-type': 'application/json;charset=utf-8' }
})

export default request
