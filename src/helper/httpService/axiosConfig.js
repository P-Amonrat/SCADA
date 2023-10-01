// src/apis/configs/axiosConfigs.js

import axios from 'axios'
import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'

// export const api = axios.create({
//   withCredentials: true,
//   baseURL: "https://yourdomain.com/api/v1",
// })

// // defining a custom error handler for all APIs
// const errorHandler = (error) => {
//   const statusCode = error.response?.status
//   console.error('errorHandler', error)
//   if (statusCode === undefined) {
//     // network error
//     window.location.href = '/misc/error-page'
//   }
//   // // logging only errors that are not 401
//   if (statusCode && statusCode === 401) {
//     console.error('unauthorize', error)
//   }

//   return Promise.reject(error)
// }

// // registering the custom error handler to the
// // "api" axios instance
// axios.interceptors.response.use(undefined, (error) => {
//   return errorHandler(error)
// })

// import * as Session from "@components/Service/Session.service";
// const timeout = 60000;

const britzEndPoint = useJwt.britzEndPoint
const baseUrl = ""

// const checkStatus = (response) => {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   } else {
//     return response;
//   }
// };

const isAxiosError = (error) => {
  return error.isAxiosError !== undefined
}

const fromStatus = (status, message) => {
  return new (status, message)
}

const fromMessage = (message, status = 400) => {
  return new (status, message)
}

// const handleRequest = async (req) => {
//   req.headers.Accept = 'application/json'
//   req.headers.Authorization = `Bearer ${localStorage.getItem(useJwt.storageTokenKeyName)}`
//   console.log('ddddddd', req)
//   return req
// }

// axios.interceptors.request.use(
//   async req => await handleRequest(req),
//   (error) => Promise.reject(error)
// )

export default {
  get: async (url, config) => {
    try {
      const response = await axios.get(baseUrl + url, config)
      return response.data
    } catch (error) {
      // display error page
      return { status: 500, message: error.message }
    }
  },
  post: async (url, data, config) => {
    try {
      const response = await axios.post(baseUrl + url, data, config && { headers: config })
      return response.data
    } catch (error) {
      // display error page
      return { status: 500, message: error.message }
    }
  },
  put: async (url, data, config) => {
    try {
      const response = await axios.put(baseUrl + url, data, config && { headers: config })
      return response
    } catch (error) {
      // display error page
      return { status: 500, message: error.message }
    }
  },
  delete: async (url, config) => {
    try {
      const response = await axios.delete(baseUrl + url, config)
      return response
    } catch (error) {
      // display error page
      return { status: 500, message: error.message }
    }
  }
}
