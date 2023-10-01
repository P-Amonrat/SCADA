import axios from "axios"

const baseURL = process.env.REACT_APP_BASE_URL // change base url
const baseSmsOld = process.env.REACT_APP_BASE_SMS_OLD // change base url
const headers = {}

if (localStorage.token) {
  headers.Authorization = `Bearer ${localStorage.token}`
}

export const axiosInstance = axios.create({
  baseURL,
  headers
})

export const axiosSmsOld = axios.create({
  baseURL: baseSmsOld,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
