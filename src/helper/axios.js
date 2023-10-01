import axios from "axios"

const baseURL = process.env.REACT_APP_BASE_URL // change base url
const headers = {}
const responseType = 'blob'

if (localStorage.accessToken) {
  headers.Authorization = `Bearer ${localStorage.accessToken}`
}

export const axiosInstance = axios.create({
  baseURL,
  headers
})

export const axiosInstanceGetFile = axios.create({
  baseURL,
  headers,
  responseType
})

// export {axiosInstance, axiosInstanceGetFile}
