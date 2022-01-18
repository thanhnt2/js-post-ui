import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://js-post-api.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

//Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('request interceptor: ', config)

    // Attach token to request if exists
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    if (!error.response) throw new Error('Network error. Please try again later.')

    if (error.response.status === 401) {
      // clear token, logout
      // ..
      window.location.href('/login.html')
      return
    }
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
